// netlify/functions/check-duplicate-txn.js
// Server-side duplicate Transaction ID check using Firebase Admin SDK.
// This avoids needing to open up Firestore read rules on payment_requests
// to every logged-in user just for the client-side duplicate check.
//
// Environment variables needed in Netlify dashboard:
//   FIREBASE_PROJECT_ID          = your-project-id
//   FIREBASE_CLIENT_EMAIL        = firebase-adminsdk-xxxx@your-project-id.iam.gserviceaccount.com
//   FIREBASE_PRIVATE_KEY_BASE64  = base64-encoded private_key (single line — avoids
//     newline-corruption issues that Netlify's env var UI causes with multi-line PEM keys).
//     To generate: base64-encode the exact "private_key" string from your service
//     account JSON (including the literal \n characters), then paste the result
//     as ONE line here.

const admin = require("firebase-admin");

function getPrivateKey() {
  const b64 = process.env.FIREBASE_PRIVATE_KEY_BASE64;
  if (b64) {
    return Buffer.from(b64, "base64").toString("utf8");
  }
  // Fallback: old-style raw PEM env var (kept for backwards compatibility)
  return (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: getPrivateKey(),
    }),
  });
}

const db = admin.firestore();

exports.handler = async function (event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    // ── Verify the caller is a logged-in user ──
    const authHeader = event.headers.authorization || event.headers.Authorization || "";
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!idToken) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: "Login প্রয়োজন।" }) };
    }
    await admin.auth().verifyIdToken(idToken); // throws if invalid/expired

    // ── Validate input ──
    const { transactionId } = JSON.parse(event.body || "{}");
    const txnRaw = (transactionId || "").trim().toUpperCase();
    if (!txnRaw || txnRaw.length < 6) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "সঠিক Transaction ID দিন।" }) };
    }

    // ── Check for duplicate (server-side, using Admin SDK — bypasses rules) ──
    const snap = await db
      .collection("payment_requests")
      .where("transactionId", "==", txnRaw)
      .limit(1)
      .get();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ duplicate: !snap.empty }),
    };
  } catch (err) {
    console.error("check-duplicate-txn error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || "Server error" }),
    };
  }
};
