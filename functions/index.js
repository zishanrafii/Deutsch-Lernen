// functions/index.js
// Deutsch Lernen — Cloud Functions (2nd gen)
// Migrated from Netlify Functions. Each function below is a 1:1 replacement
// for the corresponding file that used to live in netlify/functions/.
//
// ── SETUP (one-time) ──────────────────────────────────────────────
// 1. Install Firebase CLI if you don't have it:  npm install -g firebase-tools
// 2. From the project root:  firebase login
// 3. From the project root:  firebase init  (choose Hosting + Functions,
//    pick this existing project "deutsch-lernen-bd", use JavaScript,
//    do NOT overwrite functions/index.js or functions/package.json)
// 4. Set the secrets (one-time, prompts you to paste the value):
//      firebase functions:secrets:set STRIPE_SECRET_KEY
//      firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
//      firebase functions:secrets:set SSLCOMMERZ_STORE_ID
//      firebase functions:secrets:set SSLCOMMERZ_STORE_PASS
//      firebase functions:secrets:set ANTHROPIC_API_KEY
//    (No FIREBASE_SERVICE_ACCOUNT needed — Cloud Functions running inside
//    your own Firebase project already have admin access automatically.)
// 5. Non-secret config goes in functions/.env (see .env.example in this folder).
// 6. Deploy:  firebase deploy --only functions,hosting
//
// After deploy, your function URLs will look like:
//   https://us-central1-deutsch-lernen-bd.cloudfunctions.net/createCheckout
// (exact region/URL is printed after `firebase deploy`)
// ─────────────────────────────────────────────────────────────────

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// ── Secrets (set once via `firebase functions:secrets:set NAME`) ──
const STRIPE_SECRET_KEY     = defineSecret("STRIPE_SECRET_KEY");
const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET");
const SSLCOMMERZ_STORE_ID   = defineSecret("SSLCOMMERZ_STORE_ID");
const SSLCOMMERZ_STORE_PASS = defineSecret("SSLCOMMERZ_STORE_PASS");
const ANTHROPIC_API_KEY     = defineSecret("ANTHROPIC_API_KEY");

// ── Shared CORS helper ──
function setCors(res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
}

const PLANS_STRIPE = {
  monthly:   { name: "Deutsch Lernen — Monthly",  amount: 149, currency: "bdt", interval: "month", intervalCount: 1 },
  sixmonths: { name: "Deutsch Lernen — 6 Months", amount: 599, currency: "bdt", interval: "month", intervalCount: 6 },
  yearly:    { name: "Deutsch Lernen — 1 Year",   amount: 999, currency: "bdt", interval: "year",  intervalCount: 1 },
};
const PLANS_SSL = {
  monthly:   { name: "Deutsch Lernen — মাসিক",   amount: 149, currency: "BDT" },
  sixmonths: { name: "Deutsch Lernen — ৬ মাস",   amount: 599, currency: "BDT" },
  yearly:    { name: "Deutsch Lernen — বার্ষিক", amount: 999, currency: "BDT" },
};

function planExpiryFromNow(plan) {
  const now = new Date();
  const expiry = new Date(now);
  if (plan === "yearly") expiry.setFullYear(expiry.getFullYear() + 1);
  else if (plan === "sixmonths") expiry.setMonth(expiry.getMonth() + 6);
  else expiry.setMonth(expiry.getMonth() + 1);
  return { now, expiry };
}

/* ════════════════════════════════════════════════════════════
   1. createCheckout  (was: create-checkout.js)
════════════════════════════════════════════════════════════ */
exports.createCheckout = onRequest({ secrets: [STRIPE_SECRET_KEY] }, async (req, res) => {
  setCors(res);
  if (req.method === "OPTIONS") { res.status(200).send(""); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  const stripe = require("stripe")(STRIPE_SECRET_KEY.value());
  const { plan, uid, email } = req.body || {};

  if (!PLANS_STRIPE[plan]) { res.status(400).json({ error: "Invalid plan" }); return; }
  if (!uid || !email) { res.status(400).json({ error: "uid and email required" }); return; }

  const siteUrl = `https://${req.hostname}`;
  const p = PLANS_STRIPE[plan];

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{
        price_data: {
          currency: p.currency,
          product_data: { name: p.name },
          recurring: { interval: p.interval, interval_count: p.intervalCount },
          unit_amount: p.amount,
        },
        quantity: 1,
      }],
      metadata: { uid, plan },
      customer_email: email,
      success_url: `${siteUrl}/payment-success.html?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url:  `${siteUrl}/pricing.html?cancelled=1`,
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(502).json({ error: err.message });
  }
});

/* ════════════════════════════════════════════════════════════
   2. stripeWebhook  (was: stripe-webhook.js)
════════════════════════════════════════════════════════════ */
exports.stripeWebhook = onRequest({ secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET] }, async (req, res) => {
  const stripe = require("stripe")(STRIPE_SECRET_KEY.value());
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    // req.rawBody is provided automatically by Cloud Functions — required
    // for Stripe's signature check (req.body would already be parsed JSON).
    event = stripe.webhooks.constructEvent(req.rawBody, sig, STRIPE_WEBHOOK_SECRET.value());
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const uid  = session.metadata?.uid;
    const plan = session.metadata?.plan;

    if (!uid || !plan) {
      console.warn("Missing uid or plan in session metadata");
      res.status(200).send("OK");
      return;
    }

    const { now, expiry } = planExpiryFromNow(plan);

    // setDoc+merge instead of update: creates the doc if it's somehow missing,
    // instead of throwing "no document to update".
    await db.collection("users").doc(uid).set({
      plan,
      planProvider:      "stripe",
      planStart:         admin.firestore.Timestamp.fromDate(now),
      planExpiry:        admin.firestore.Timestamp.fromDate(expiry),
      stripeCustomerId:  session.customer,
      stripeSessionId:   session.id,
    }, { merge: true });

    console.log(`✅ Plan "${plan}" activated for user ${uid}`);
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    const customerId = subscription.customer;

    const snap = await db.collection("users")
      .where("stripeCustomerId", "==", customerId)
      .limit(1)
      .get();

    if (!snap.empty) {
      await snap.docs[0].ref.set({ plan: "free", planExpiry: null }, { merge: true });
      console.log(`⬇️ Plan downgraded to free for customer ${customerId}`);
    }
  }

  res.status(200).json({ received: true });
});

/* ════════════════════════════════════════════════════════════
   3. sslcommerzInit  (was: sslcommerz-init.js)
════════════════════════════════════════════════════════════ */
exports.sslcommerzInit = onRequest({ secrets: [SSLCOMMERZ_STORE_ID, SSLCOMMERZ_STORE_PASS] }, async (req, res) => {
  setCors(res);
  if (req.method === "OPTIONS") { res.status(200).send(""); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  const axios = require("axios");
  const { plan, uid, email, name } = req.body || {};

  if (!PLANS_SSL[plan]) { res.status(400).json({ error: "Invalid plan" }); return; }
  if (!uid || !email) { res.status(400).json({ error: "uid and email required" }); return; }

  const isLive  = process.env.SSLCOMMERZ_IS_LIVE === "true";
  const baseUrl = isLive
    ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
    : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";
  const siteUrl = `https://${req.hostname}`;
  const p       = PLANS_SSL[plan];
  const tran_id = `DL_${uid.slice(0, 8)}_${Date.now()}`;

  const params = new URLSearchParams({
    store_id:       SSLCOMMERZ_STORE_ID.value(),
    store_passwd:   SSLCOMMERZ_STORE_PASS.value(),
    total_amount:   p.amount,
    currency:       p.currency,
    tran_id,
    success_url:    `${siteUrl}/payment-success.html?provider=sslcommerz&plan=${plan}&uid=${uid}&tran_id=${tran_id}`,
    fail_url:       `${siteUrl}/pricing.html?failed=1`,
    cancel_url:     `${siteUrl}/pricing.html?cancelled=1`,
    ipn_url:        `${siteUrl}/sslcommerzIpn`, // ⚠️ update if you rewrite the Hosting rewrite path
    product_name:   p.name,
    product_category: "Education",
    product_profile: "general",
    cus_name:       name || "Lerner",
    cus_email:      email,
    cus_phone:      "01700000000",
    cus_add1:       "Bangladesh",
    cus_city:       "Dhaka",
    cus_country:    "Bangladesh",
    shipping_method: "NO",
    num_of_item:    1,
    value_a:        uid,
    value_b:        plan,
  });

  try {
    const sslRes = await axios.post(baseUrl, params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const data = sslRes.data;
    if (data.status === "SUCCESS") {
      res.status(200).json({ url: data.GatewayPageURL, tran_id });
    } else {
      res.status(502).json({ error: data.failedreason || "SSLCommerz error" });
    }
  } catch (err) {
    console.error("SSLCommerz error:", err.message);
    res.status(502).json({ error: err.message });
  }
});

/* ════════════════════════════════════════════════════════════
   4. sslcommerzIpn  (was: sslcommerz-ipn.js)
════════════════════════════════════════════════════════════ */
exports.sslcommerzIpn = onRequest({ secrets: [SSLCOMMERZ_STORE_ID, SSLCOMMERZ_STORE_PASS] }, async (req, res) => {
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  const axios = require("axios");
  // Cloud Functions parses application/x-www-form-urlencoded into req.body automatically
  const body     = req.body || {};
  const tran_id  = body.tran_id || "";
  const val_id   = body.val_id  || "";
  const status   = body.status  || "";
  const uid      = body.value_a || "";
  const plan     = body.value_b || "";

  if (status !== "VALID" && status !== "VALIDATED") {
    res.status(200).json({ message: "Payment not valid, skipping" });
    return;
  }

  const isLive   = process.env.SSLCOMMERZ_IS_LIVE === "true";
  const validUrl = isLive
    ? "https://securepay.sslcommerz.com/validator/api/validationserverAPI.php"
    : "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php";

  try {
    const validRes = await axios.get(validUrl, {
      params: {
        val_id,
        store_id:     SSLCOMMERZ_STORE_ID.value(),
        store_passwd: SSLCOMMERZ_STORE_PASS.value(),
        format: "json",
      },
    });

    if (validRes.data.status !== "VALID") {
      res.status(200).json({ message: "Validation failed" });
      return;
    }

    const { now, expiry } = planExpiryFromNow(plan);

    await db.collection("users").doc(uid).set({
      plan,
      planProvider: "sslcommerz",
      planStart:    admin.firestore.Timestamp.fromDate(now),
      planExpiry:   admin.firestore.Timestamp.fromDate(expiry),
      planTranId:   tran_id,
    }, { merge: true });

    res.status(200).json({ message: "Plan updated successfully" });
  } catch (err) {
    console.error("IPN error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ════════════════════════════════════════════════════════════
   5. writingFeedback  (was: writing-feedback.js)
════════════════════════════════════════════════════════════ */
exports.writingFeedback = onRequest({ secrets: [ANTHROPIC_API_KEY] }, async (req, res) => {
  setCors(res);
  if (req.method === "OPTIONS") { res.status(200).send(""); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  const { text, level } = req.body || {};

  if (!text || typeof text !== "string" || !text.trim()) {
    res.status(400).json({ error: "Text is required" }); return;
  }
  if (text.length > 3000) {
    res.status(400).json({ error: "Text too long (max 3000 characters)" }); return;
  }

  const safeLevel = ["A1", "A2", "B1", "B2", "C1", "C2"].includes(level) ? level : "A1";

  const systemPrompt = `তুমি একজন অভিজ্ঞ German ভাষার শিক্ষক। Student বাংলাভাষী, German শিখছে CEFR level ${safeLevel}-এ।
শুধুমাত্র নিচের JSON format-এ উত্তর দাও, অন্য কোনো ব্যাখ্যা বা টেক্সট ছাড়া:

{
  "corrected_text": "ব্যাকরণগতভাবে সঠিক German version",
  "errors": [
    { "original": "ভুল অংশ", "correction": "সঠিক অংশ", "explanation_bn": "কেন ভুল ছিল, বাংলায় সংক্ষেপে" }
  ],
  "overall_feedback_bn": "সামগ্রিক মূল্যায়ন বাংলায়, ২-৩ বাক্যে, উৎসাহব্যঞ্জক টোনে",
  "score": 0,
  "level_appropriate": true
}

score হলো 0-100 এর মধ্যে একটা সংখ্যা যা লেখাটার মান বোঝায়।
level_appropriate বলবে লেখাটা ${safeLevel} level-এর জন্য উপযুক্ত কিনা।
errors array খালি থাকতে পারে যদি কোনো ভুল না থাকে।
শুধু raw JSON ফেরত দাও, কোনো markdown code fence বা অতিরিক্ত টেক্সট ছাড়া।`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY.value(),
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: "user", content: `Student-এর German লেখা:\n\n"${text.trim()}"` }],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Anthropic API error:", response.status, errBody);
      res.status(502).json({ error: "AI service error, please try again" });
      return;
    }

    const data = await response.json();
    const rawText = data.content
      ?.map(block => (block.type === "text" ? block.text : ""))
      .filter(Boolean)
      .join("\n") || "";

    const cleaned = rawText.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI JSON:", cleaned);
      res.status(502).json({ error: "AI returned unexpected format" });
      return;
    }

    res.status(200).json(parsed);
  } catch (err) {
    console.error("Function error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// ═══════════════════════════════════════════════════════════════
//  applyReferral — Referral system (Admin SDK, bypasses Firestore
//  rules safely). Called once by index.html right after a brand-new
//  user document is created, IF the visitor landed via ?ref=CODE.
//
//  Body: { newUid: string, referralCode: string }
//
//  Rules of the road:
//   - Never throws on invalid/unknown code — just no-ops.
//   - Never double-applies (checks referredBy first).
//   - Can't refer yourself.
//   - +200 XP to both new user and referrer immediately.
//   - Milestone free-Premium-day rewards at 3 / 5 / 10 referrals.
// ═══════════════════════════════════════════════════════════════
const REFERRAL_SIGNUP_XP = 200;
const REFERRAL_MILESTONES = { 3: 7, 5: 15, 10: 30 }; // referralCount → bonus free days

exports.applyReferral = onRequest(async (req, res) => {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).send("");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { newUid, referralCode } = req.body || {};
    if (!newUid || !referralCode) {
      return res.status(400).json({ error: "newUid and referralCode required" });
    }

    const newUserRef  = db.collection("users").doc(newUid);
    const newUserSnap = await newUserRef.get();
    if (!newUserSnap.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Already credited once? never double-apply.
    if (newUserSnap.data().referredBy) {
      return res.status(200).json({ ok: true, alreadyApplied: true });
    }

    const codeUpper = String(referralCode).trim().toUpperCase();
    const refQuery = await db.collection("users")
      .where("referralCode", "==", codeUpper)
      .limit(1)
      .get();

    if (refQuery.empty) {
      return res.status(200).json({ ok: true, invalidCode: true });
    }

    const referrerDoc = refQuery.docs[0];
    const referrerUid = referrerDoc.id;

    if (referrerUid === newUid) {
      return res.status(200).json({ ok: true, selfReferral: true });
    }

    const referrerData    = referrerDoc.data();
    const newReferralCount = (referrerData.referralCount || 0) + 1;

    const batch = db.batch();

    batch.update(newUserRef, {
      referredBy: referrerUid,
      xp: admin.firestore.FieldValue.increment(REFERRAL_SIGNUP_XP),
    });

    const newUserName = newUserSnap.data().displayName || "একজন বন্ধু";

    const referrerUpdate = {
      referrals:     admin.firestore.FieldValue.arrayUnion(newUid),
      referralCount: admin.firestore.FieldValue.increment(1),
      xp:            admin.firestore.FieldValue.increment(REFERRAL_SIGNUP_XP),
      // Small denormalized activity log kept on the REFERRER'S OWN doc so
      // invite.html can display "who joined" without ever needing to read
      // another user's document (which Firestore rules correctly forbid).
      referralActivity: admin.firestore.FieldValue.arrayUnion({
        uid: newUid,
        name: newUserName,
        joinedAt: new Date().toISOString(),
      }),
    };

    // Milestone → bonus free Premium days
    const bonusDays = REFERRAL_MILESTONES[newReferralCount];
    if (bonusDays) {
      const currentExpiry = referrerData.planExpiry?.toDate?.() || new Date(0);
      const base          = currentExpiry > new Date() ? currentExpiry : new Date();
      const newExpiry      = new Date(base.getTime() + bonusDays * 24 * 60 * 60 * 1000);

      referrerUpdate.planExpiry     = admin.firestore.Timestamp.fromDate(newExpiry);
      referrerUpdate.planProvider   = referrerData.planProvider || "referral";
      referrerUpdate.plan           = referrerData.plan && referrerData.plan !== "free"
                                        ? referrerData.plan
                                        : "monthly";
      referrerUpdate.freeDaysEarned = admin.firestore.FieldValue.increment(bonusDays);
    }

    batch.update(referrerDoc.ref, referrerUpdate);
    await batch.commit();

    return res.status(200).json({
      ok: true,
      referrerUid,
      xpAwarded: REFERRAL_SIGNUP_XP,
      milestoneBonusDays: bonusDays || 0,
    });
  } catch (err) {
    console.error("applyReferral error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
});
