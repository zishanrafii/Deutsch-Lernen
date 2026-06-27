// netlify/functions/sslcommerz-ipn.js
// SSLCommerz IPN handler — called by SSLCommerz after successful payment.
// Updates Firestore user.plan field to "monthly" or "yearly".
//
// Environment variables:
//   SSLCOMMERZ_STORE_ID, SSLCOMMERZ_STORE_PASS, SSLCOMMERZ_IS_LIVE
//   FIREBASE_SERVICE_ACCOUNT = JSON string of Firebase Admin SDK service account

const axios = require("axios");

exports.handler = async function (event) {
  const headers = { "Content-Type": "application/json" };

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const params = new URLSearchParams(event.body || "");
  const tran_id   = params.get("tran_id")   || "";
  const val_id    = params.get("val_id")    || "";
  const status    = params.get("status")    || "";
  const uid       = params.get("value_a")   || "";
  const plan      = params.get("value_b")   || "";

  if (status !== "VALID" && status !== "VALIDATED") {
    return { statusCode: 200, headers, body: JSON.stringify({ message: "Payment not valid, skipping" }) };
  }

  // Validate transaction with SSLCommerz
  const isLive   = process.env.SSLCOMMERZ_IS_LIVE === "true";
  const validUrl = isLive
    ? `https://securepay.sslcommerz.com/validator/api/validationserverAPI.php`
    : `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php`;

  try {
    const validRes = await axios.get(validUrl, {
      params: {
        val_id,
        store_id:    process.env.SSLCOMMERZ_STORE_ID,
        store_passwd: process.env.SSLCOMMERZ_STORE_PASS,
        format: "json",
      },
    });

    if (validRes.data.status !== "VALID") {
      return { statusCode: 200, headers, body: JSON.stringify({ message: "Validation failed" }) };
    }

    // Update Firestore via Firebase Admin SDK
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");
    const admin = require("firebase-admin");

    if (!admin.apps.length) {
      admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    }

    const db = admin.firestore();
    const now = new Date();
    const expiry = new Date(now);
    if (plan === "yearly") expiry.setFullYear(expiry.getFullYear() + 1);
    else if (plan === "sixmonths") expiry.setMonth(expiry.getMonth() + 6);
    else expiry.setMonth(expiry.getMonth() + 1); // monthly

    await db.collection("users").doc(uid).update({
      plan:         plan,
      planProvider: "sslcommerz",
      planStart:    admin.firestore.Timestamp.fromDate(now),
      planExpiry:   admin.firestore.Timestamp.fromDate(expiry),
      planTranId:   tran_id,
    });

    return { statusCode: 200, headers, body: JSON.stringify({ message: "Plan updated successfully" }) };
  } catch (err) {
    console.error("IPN error:", err.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
