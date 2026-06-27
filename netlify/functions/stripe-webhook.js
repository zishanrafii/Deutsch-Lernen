// netlify/functions/stripe-webhook.js
// Stripe webhook handler — called by Stripe after successful checkout.
// Updates Firestore user.plan field.
//
// Environment variables:
//   STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
//   FIREBASE_SERVICE_ACCOUNT = JSON string of Firebase Admin SDK service account
//
// In Stripe dashboard → Webhooks, add endpoint:
//   https://your-site.netlify.app/.netlify/functions/stripe-webhook
// Events to listen: checkout.session.completed, customer.subscription.deleted

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event) {
  const sig     = event.headers["stripe-signature"];
  const secret  = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, secret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  // Firebase Admin init
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");
  const admin = require("firebase-admin");
  if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  }
  const db = admin.firestore();

  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;
    const uid     = session.metadata?.uid;
    const plan    = session.metadata?.plan;

    if (!uid || !plan) {
      console.warn("Missing uid or plan in session metadata");
      return { statusCode: 200, body: "OK" };
    }

    const now    = new Date();
    const expiry = new Date(now);
    if (plan === "yearly") expiry.setFullYear(expiry.getFullYear() + 1);
    else if (plan === "sixmonths") expiry.setMonth(expiry.getMonth() + 6);
    else expiry.setMonth(expiry.getMonth() + 1);

    await db.collection("users").doc(uid).update({
      plan:              plan,
      planProvider:      "stripe",
      planStart:         admin.firestore.Timestamp.fromDate(now),
      planExpiry:        admin.firestore.Timestamp.fromDate(expiry),
      stripeCustomerId:  session.customer,
      stripeSessionId:   session.id,
    });

    console.log(`✅ Plan "${plan}" activated for user ${uid}`);
  }

  if (stripeEvent.type === "customer.subscription.deleted") {
    // Subscription cancelled — downgrade to free
    const subscription = stripeEvent.data.object;
    const customerId   = subscription.customer;

    // Find user by stripeCustomerId
    const snap = await db.collection("users")
      .where("stripeCustomerId", "==", customerId)
      .limit(1)
      .get();

    if (!snap.empty) {
      await snap.docs[0].ref.update({
        plan:        "free",
        planExpiry:  null,
      });
      console.log(`⬇️ Plan downgraded to free for customer ${customerId}`);
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
