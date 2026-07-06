// js/plan-gate.js
// Checks the "plan" / "planExpiry" fields on the user's own users/{uid} document —
// this is what stripe-webhook.js and sslcommerz-ipn.js actually write after a
// successful payment (via Firebase Admin SDK, which bypasses Firestore rules).
// Admin (role:"admin") always gets full access — no subscription needed.

import { db, doc, getDoc } from "./firebase-config.js";

export async function checkPlan(uid, redirectBack) {
  try {
    const userSnap = await getDoc(doc(db, "users", uid));
    if (!userSnap.exists()) {
      const back = encodeURIComponent(redirectBack || window.location.pathname);
      window.location.href = `bkash-payment.html?locked=1&back=${back}`;
      return false;
    }
    const data = userSnap.data();

    // Admin bypass
    if (data.role === "admin") return true;

    // Check active plan
    if (data.plan) {
      const expiry = data.planExpiry?.toDate
        ? data.planExpiry.toDate()
        : (data.planExpiry ? new Date(data.planExpiry) : null);
      if (expiry && expiry > new Date()) {
        return true; // ✅ Active & not expired
      }
    }
  } catch (err) {
    console.warn("plan-gate: check failed", err);
  }

  // Not subscribed or expired → redirect
  const back = encodeURIComponent(redirectBack || window.location.pathname);
  window.location.href = `bkash-payment.html?locked=1&back=${back}`;
  return false;
}

export async function getSubscription(uid) {
  try {
    const snap = await getDoc(doc(db, "users", uid));
    if (snap.exists()) {
      const data = snap.data();
      return { plan: data.plan || null, expiryDate: data.planExpiry || null, active: !!data.plan };
    }
  } catch (e) { /* ignore */ }
  return null;
}

// Synchronous gate used by pages that already fetched the user's own
// users/{uid} data (e.g. inside requireAuth callbacks). Returns true if the
// page should continue rendering; otherwise shows the locked overlay and
// returns false so the caller can stop its init early.
export function requirePlan(data) {
  if (!data) { showLockedOverlay(); return false; }
  if (data.role === "admin") return true;

  if (data.plan) {
    const expiry = data.planExpiry?.toDate
      ? data.planExpiry.toDate()
      : (data.planExpiry ? new Date(data.planExpiry) : null);
    if (expiry && expiry > new Date()) return true;
  }

  showLockedOverlay();
  return false;
}

// Async helper for displaying subscription status (e.g. mein-profil.html's
// account card). Returns null if no plan found.
export async function checkSubscription(uid) {
  try {
    const snap = await getDoc(doc(db, "users", uid));
    if (!snap.exists()) return null;
    const data = snap.data();
    if (!data.plan) return null;
    const expiry = data.planExpiry?.toDate
      ? data.planExpiry.toDate()
      : (data.planExpiry ? new Date(data.planExpiry) : null);
    return {
      plan: data.plan,
      provider: data.planProvider || null,
      expiryDate: expiry,
      active: !!(expiry && expiry > new Date()),
    };
  } catch (e) {
    return null;
  }
}

export function showLockedOverlay(featureName = "এই feature") {
  if (document.getElementById("plan-gate-overlay")) return;
  const overlay = document.createElement("div");
  overlay.id = "plan-gate-overlay";
  overlay.style.cssText = `position:fixed;inset:0;z-index:9000;background:rgba(4,8,15,.93);
    backdrop-filter:blur(20px);display:flex;align-items:center;justify-content:center;padding:1.5rem;`;
  overlay.innerHTML = `
    <div style="background:#080e1a;border:1px solid rgba(245,200,66,.2);border-radius:24px;
      padding:2.5rem 2rem;max-width:420px;width:100%;text-align:center;
      box-shadow:0 30px 80px rgba(0,0,0,.7);position:relative;overflow:hidden;">
      <div style="position:absolute;top:0;left:0;right:0;height:2px;
        background:linear-gradient(90deg,transparent,#f5c842 30%,#2dd4bf 70%,transparent);"></div>
      <div style="font-size:3rem;margin-bottom:1rem;">🔒</div>
      <h3 style="font-size:1.4rem;font-weight:800;margin-bottom:.5rem;
        background:linear-gradient(135deg,#f5c842,#2dd4bf);-webkit-background-clip:text;
        -webkit-text-fill-color:transparent;background-clip:text;">Upgrade করুন</h3>
      <p style="font-size:13.5px;color:#94a3b8;line-height:1.7;margin-bottom:1.6rem;
        font-family:'Noto Sans Bengali',sans-serif;">
        ${featureName} ব্যবহার করতে একটি paid plan প্রয়োজন।<br>
        মাত্র <strong style="color:#f5c842;">৳149/মাস</strong> থেকে শুরু।
      </p>
      <a href="bkash-payment.html" style="display:block;background:linear-gradient(135deg,#f5c842,#e0a820);
        color:#000;padding:.85rem 1.5rem;border-radius:13px;font-weight:800;font-size:14px;
        text-decoration:none;margin-bottom:.8rem;font-family:'Outfit',sans-serif;">
        💳 Plan দেখুন ও Payment করুন
      </a>
      <a href="dashboard.html" style="font-size:12.5px;color:#64748b;text-decoration:none;
        font-family:'Noto Sans Bengali',sans-serif;">← Dashboard-এ ফিরুন</a>
    </div>`;
  document.body.appendChild(overlay);
}
