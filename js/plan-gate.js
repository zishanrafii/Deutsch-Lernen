// js/plan-gate.js
// Import this at the top of any page that requires a paid plan.
// Usage:
//   import { requirePlan } from "./js/plan-gate.js";
//   requirePlan(); // call once in your requireAuth callback, after loading user data
//
// It checks user.plan in Firestore. If "free" or expired, redirects to pricing.html.

import { db, doc, getDoc } from "./firebase-config.js";

/**
 * Call inside requireAuth callback, passing the Firestore user data object.
 * If plan is free or expired → redirect to pricing.html with a message.
 *
 * @param {object} userData - Firestore user document data
 * @param {string} [redirectTo] - where to go after upgrade (default: current page)
 */
export function requirePlan(userData, redirectTo) {
  const plan    = userData?.plan || "free";
  const expiry  = userData?.planExpiry;

  const validPlans = ["monthly", "sixmonths", "yearly"];

  // Check expiry
  if (validPlans.includes(plan) && expiry) {
    const expiryDate = expiry?.toDate ? expiry.toDate() : new Date(expiry);
    if (expiryDate < new Date()) {
      // Plan expired — redirect
      const back = encodeURIComponent(redirectTo || window.location.pathname);
      window.location.href = `pricing.html?expired=1&back=${back}`;
      return false;
    }
  }

  if (!validPlans.includes(plan)) {
    const back = encodeURIComponent(redirectTo || window.location.pathname);
    window.location.href = `pricing.html?locked=1&back=${back}`;
    return false;
  }

  return true;
}

/**
 * Show an inline "locked" overlay instead of redirecting.
 * Call this if you want to show a paywall inside the page rather than redirect.
 *
 * @param {string} featureName - Bengali name of the locked feature
 */
export function showLockedOverlay(featureName = "এই feature") {
  const existing = document.getElementById("plan-gate-overlay");
  if (existing) return;

  const overlay = document.createElement("div");
  overlay.id = "plan-gate-overlay";
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9000;
    background:rgba(4,8,15,.92);backdrop-filter:blur(20px);
    display:flex;align-items:center;justify-content:center;padding:1.5rem;
  `;
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
      <a href="pricing.html" style="display:block;background:linear-gradient(135deg,#f5c842,#e0a820);
        color:#000;padding:.85rem 1.5rem;border-radius:13px;font-weight:800;font-size:14px;
        text-decoration:none;margin-bottom:.8rem;transition:.2s;font-family:'Outfit',sans-serif;">
        💎 Plan দেখুন ও Upgrade করুন
      </a>
      <a href="dashboard.html" style="font-size:12.5px;color:#64748b;text-decoration:none;
        font-family:'Noto Sans Bengali',sans-serif;">← Dashboard-এ ফিরুন</a>
    </div>
  `;
  document.body.appendChild(overlay);
}
