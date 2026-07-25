// ═══════════════════════════════════════════════════════
//  Deutsch Lernen — User Menu (avatar dropdown)
//  js/user-menu.js
//
//  Replaces the old per-page pattern of showing avatar + name +
//  plan badge + a standalone "Logout" button all at once in every
//  topbar. Instead: one avatar. Click it, everything user-related
//  (Profile, Settings, Plan, Logout) lives in one dropdown.
//
//  Usage on any page:
//
//    import { renderUserMenu } from "./js/user-menu.js";
//    renderUserMenu(document.getElementById("user-menu-container"), {
//      name: d.displayName || user.displayName || "Lerner",
//      photo: d.photoURL || user.photoURL || "",
//      plan: d.plan || "free",
//      onLogout: async () => { await signOut(auth); location.href = "index.html"; },
//    });
//
//  Relies on css/user-menu.css being loaded on the page.
// ═══════════════════════════════════════════════════════

export function renderUserMenu(container, opts = {}) {
  if (!container) return;
  const { name = "Lerner", photo = "", plan = "free", onLogout } = opts;

  const initial = (name[0] || "?").toUpperCase();
  const avatarHtml = photo
    ? `<img src="${photo}" alt="">`
    : initial;

  const isPro = plan === "monthly" || plan === "sixmonths" || plan === "yearly";
  const planLabel = isPro
    ? (plan === "yearly" ? "PRO 👑" : plan === "sixmonths" ? "PRO 🚀" : "PRO ⚡")
    : "FREE";

  container.innerHTML = `
    <div class="dl-user-menu">
      <button type="button" class="dl-user-trigger" aria-haspopup="true" aria-expanded="false">
        <span class="dl-user-avatar">${avatarHtml}</span>
      </button>
      <div class="dl-user-dropdown" hidden>
        <div class="dl-user-head">
          <span class="dl-user-avatar dl-user-avatar-lg">${avatarHtml}</span>
          <div class="dl-user-headtext">
            <div class="dl-user-name">${name}</div>
            <span class="dl-user-plan ${isPro ? "is-pro" : ""}">${planLabel}</span>
          </div>
        </div>
        <div class="dl-user-items">
          <a href="mein-profil.html" class="dl-user-item">
            <span>👤</span> Mein Profil
          </a>
          <a href="settings.html" class="dl-user-item">
            <span>⚙️</span> Einstellungen
          </a>
          <a href="pricing.html" class="dl-user-item">
            <span>💎</span> ${isPro ? "Plan verwalten" : "Upgrade করুন"}
          </a>
          <button type="button" class="dl-user-item dl-user-item-danger" id="dl-user-logout">
            <span>🚪</span> Logout
          </button>
        </div>
      </div>
    </div>`;

  const trigger  = container.querySelector(".dl-user-trigger");
  const dropdown = container.querySelector(".dl-user-dropdown");

  trigger.addEventListener("click", () => {
    const willOpen = dropdown.hidden;
    dropdown.hidden = !willOpen;
    trigger.setAttribute("aria-expanded", String(willOpen));
  });

  document.addEventListener("click", e => {
    if (!container.contains(e.target)) dropdown.hidden = true;
  });

  const logoutBtn = container.querySelector("#dl-user-logout");
  if (logoutBtn && onLogout) {
    logoutBtn.addEventListener("click", onLogout);
  }
}
