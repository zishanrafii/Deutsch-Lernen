// ═══════════════════════════════════════════════════════
//  Deutsch Lernen — Language Switcher UI
//  js/lang-switcher.js
//
//  Two pieces, both built on top of js/i18n.js:
//
//  1. renderSwitcher(container) — a small dropdown (flag + name)
//     you can drop into any navbar. Call again after DOM changes
//     if needed; it's cheap.
//
//  2. showOnboardingPicker({ onDone }) — a full-screen "choose your
//     language" card shown once, the first time a visitor lands on
//     the site (before they've picked anything). No-ops if they've
//     already chosen.
//
//  Both rely on css/lang-switcher.css being loaded on the page.
// ═══════════════════════════════════════════════════════

import { getLang, setLang, hasChosenLang, t } from "./i18n.js";

const FLAGS = { bn: "🇧🇩", en: "🇬🇧" };
const NAMES = { bn: "বাংলা", en: "English" };

export function renderSwitcher(container, opts = {}) {
  if (!container) return;
  const current = getLang();

  container.innerHTML = `
    <div class="dl-lang-switch">
      <button type="button" class="dl-lang-btn" aria-haspopup="true" aria-expanded="false">
        <span>${FLAGS[current] || ""}</span>
        <span>${NAMES[current] || current}</span>
        <span class="dl-lang-caret">▾</span>
      </button>
      <div class="dl-lang-menu" hidden>
        ${Object.keys(FLAGS).map(l => `
          <button type="button" class="dl-lang-opt${l === current ? " active" : ""}" data-lang="${l}">
            <span>${FLAGS[l]}</span><span>${NAMES[l]}</span>
          </button>`).join("")}
      </div>
    </div>`;

  const btn  = container.querySelector(".dl-lang-btn");
  const menu = container.querySelector(".dl-lang-menu");

  btn.addEventListener("click", () => {
    const willOpen = menu.hidden;
    menu.hidden = !willOpen;
    btn.setAttribute("aria-expanded", String(willOpen));
  });

  document.addEventListener("click", e => {
    if (!container.contains(e.target)) menu.hidden = true;
  });

  menu.querySelectorAll(".dl-lang-opt").forEach(optEl => {
    optEl.addEventListener("click", async () => {
      const lang = optEl.getAttribute("data-lang");
      await setLang(lang, { onChanged: opts.onChanged });
      renderSwitcher(container, opts); // re-render to reflect new active state
    });
  });
}

// Shown once, pre-login, so a brand-new visitor picks their language
// before they even see the site. Safe to call on every page load —
// it checks hasChosenLang() and does nothing if already set.
export function showOnboardingPicker({ onDone, onChanged, force = false } = {}) {
  if (!force && hasChosenLang()) {
    onDone?.(getLang());
    return;
  }

  const overlay = document.createElement("div");
  overlay.className = "dl-lang-overlay";
  overlay.innerHTML = `
    <div class="dl-lang-modal">
      <div class="dl-lang-modal-icon">🇩🇪</div>
      <h2>${t("lang_picker.title", "আপনি কোন ভাষা থেকে German শিখতে চান?")}</h2>
      <p>${t("lang_picker.subtitle", "সব ব্যাখ্যা, মেনু ও নির্দেশনা এই ভাষায় দেখানো হবে। পরে যেকোনো সময় বদলাতে পারবেন।")}</p>
      <div class="dl-lang-options">
        ${Object.keys(FLAGS).map(l => `
          <button type="button" class="dl-lang-card" data-lang="${l}">
            <span class="flag">${FLAGS[l]}</span>
            <span>${NAMES[l]}</span>
          </button>`).join("")}
      </div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.querySelectorAll(".dl-lang-card").forEach(card => {
    card.addEventListener("click", async () => {
      const lang = card.getAttribute("data-lang");
      overlay.classList.add("closing");
      await setLang(lang, { onChanged });
      overlay.remove();
      onDone?.(lang);
    });
  });
}
