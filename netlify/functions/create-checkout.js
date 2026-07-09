// netlify/functions/create-checkout.js
// Secure Stripe checkout session creator.
//
// Environment variables needed in Netlify dashboard:
//   STRIPE_SECRET_KEY = sk_live_xxxx  (or sk_test_xxxx for testing)
//   URL = https://your-site.netlify.app  (your deployed site URL)

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const PLANS = {
  monthly: {
    name: "Deutsch Lernen — Monthly",
    amount: 299,    // BDT 299 (change currency/amount as needed for Stripe)
    currency: "bdt",
    interval: "month",
    intervalCount: 1,
  },
  sixmonths: {
    name: "Deutsch Lernen — 6 Months",
    amount: 999,
    currency: "bdt",
    interval: "month",
    intervalCount: 6,
  },
  yearly: {
    name: "Deutsch Lernen — 1 Year",
    amount: 1999,
    currency: "bdt",
    interval: "year",
    intervalCount: 1,
  },
};

exports.handler = async function (event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };

  let body;
  try { body = JSON.parse(event.body || "{}"); }
  catch { return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) }; }

  const { plan, uid, email } = body;
  if (!PLANS[plan]) return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid plan" }) };
  if (!uid || !email) return { statusCode: 400, headers, body: JSON.stringify({ error: "uid and email required" }) };

  const siteUrl = process.env.URL || "http://localhost:8888";
  const p = PLANS[plan];

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

    return { statusCode: 200, headers, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    console.error("Stripe error:", err);
    return { statusCode: 502, headers, body: JSON.stringify({ error: err.message }) };
  }
};
