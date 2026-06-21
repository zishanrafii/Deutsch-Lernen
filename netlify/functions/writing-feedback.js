// netlify/functions/writing-feedback.js
//
// Secure server-side proxy to the Anthropic API.
// The API key lives only here (Netlify environment variable),
// never in the browser/client code.
//
// Setup:
//   1. In Netlify dashboard → Site settings → Environment variables
//      add: ANTHROPIC_API_KEY = sk-ant-xxxxxxxx
//   2. Deploy. This function will be reachable at:
//      /.netlify/functions/writing-feedback

exports.handler = async function (event) {
  // CORS headers for browser fetch()
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }

  const { text, level } = payload;

  if (!text || typeof text !== "string" || !text.trim()) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Text is required" }) };
  }
  if (text.length > 3000) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Text too long (max 3000 characters)" }) };
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
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: "Server not configured (missing API key)" }) };
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          { role: "user", content: `Student-এর German লেখা:\n\n"${text.trim()}"` }
        ],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Anthropic API error:", response.status, errBody);
      return { statusCode: 502, headers, body: JSON.stringify({ error: "AI service error, please try again" }) };
    }

    const data = await response.json();
    const rawText = data.content
      ?.map(block => (block.type === "text" ? block.text : ""))
      .filter(Boolean)
      .join("\n") || "";

    // Strip accidental markdown fences before parsing
    const cleaned = rawText.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Failed to parse AI JSON:", cleaned);
      return { statusCode: 502, headers, body: JSON.stringify({ error: "AI returned unexpected format" }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify(parsed) };

  } catch (err) {
    console.error("Function error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Internal server error" }) };
  }
};
