// netlify/functions/sslcommerz-init.js
// SSLCommerz payment initialization for Bangladesh (bKash, Nagad, Rocket, card).
//
// Environment variables needed in Netlify dashboard:
//   SSLCOMMERZ_STORE_ID  = your_store_id
//   SSLCOMMERZ_STORE_PASS = your_store_password
//   SSLCOMMERZ_IS_LIVE   = "true" for production, "false" for sandbox
//   URL = https://your-site.netlify.app

const axios = require("axios");

const PLANS = {
  monthly:   { name: "Deutsch Lernen — মাসিক",    amount: 149,  currency: "BDT" },
  sixmonths: { name: "Deutsch Lernen — ৬ মাস",    amount: 599,  currency: "BDT" },
  yearly:    { name: "Deutsch Lernen — বার্ষিক",  amount: 999,  currency: "BDT" },
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

  const { plan, uid, email, name } = body;
  if (!PLANS[plan]) return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid plan" }) };
  if (!uid || !email) return { statusCode: 400, headers, body: JSON.stringify({ error: "uid and email required" }) };

  const isLive   = process.env.SSLCOMMERZ_IS_LIVE === "true";
  const baseUrl  = isLive
    ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
    : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";
  const siteUrl  = process.env.URL || "http://localhost:8888";
  const p        = PLANS[plan];
  const tran_id  = `DL_${uid.slice(0,8)}_${Date.now()}`;

  const params = new URLSearchParams({
    store_id:       process.env.SSLCOMMERZ_STORE_ID  || "",
    store_passwd:   process.env.SSLCOMMERZ_STORE_PASS || "",
    total_amount:   p.amount,
    currency:       p.currency,
    tran_id,
    success_url:    `${siteUrl}/payment-success.html?provider=sslcommerz&plan=${plan}&uid=${uid}&tran_id=${tran_id}`,
    fail_url:       `${siteUrl}/pricing.html?failed=1`,
    cancel_url:     `${siteUrl}/pricing.html?cancelled=1`,
    ipn_url:        `${siteUrl}/.netlify/functions/sslcommerz-ipn`,
    product_name:   p.name,
    product_category: "Education",
    product_profile: "general",
    cus_name:       name  || "Lerner",
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
    const res  = await axios.post(baseUrl, params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const data = res.data;

    if (data.status === "SUCCESS") {
      return { statusCode: 200, headers, body: JSON.stringify({ url: data.GatewayPageURL, tran_id }) };
    } else {
      return { statusCode: 502, headers, body: JSON.stringify({ error: data.failedreason || "SSLCommerz error" }) };
    }
  } catch (err) {
    console.error("SSLCommerz error:", err.message);
    return { statusCode: 502, headers, body: JSON.stringify({ error: err.message }) };
  }
};
