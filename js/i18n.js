// ═══════════════════════════════════════════════════════
//  Deutsch Lernen — i18n Engine
//  js/i18n.js
//
//  Lets a user choose which language they learn German FROM
//  (currently: Bangla, English — add more by dropping a new
//  /locales/<code>.json file and adding it to SUPPORTED below).
//
//  Usage on any page:
//
//    import { initI18n, t, setLang, getLang, onLangChange } from "./js/i18n.js";
//    await initI18n();                 // call once, as early as possible
//    document.title = t("meta.title"); // read a string anywhere in JS
//
//  In HTML, mark translatable elements instead of hardcoding text:
//    <button data-i18n="auth.login_button">লগইন করুন</button>
//    <input data-i18n-placeholder="auth.name_placeholder" placeholder="...">
//  initI18n() (and setLang()) will fill these in automatically.
// ═══════════════════════════════════════════════════════

export const SUPPORTED_LANGS = ["bn", "en"];
export const DEFAULT_LANG = "bn";
const STORAGE_KEY = "dl_lang";

let currentLang = null;
let dict = {};
const listeners = [];

// Locale files live at the site root (/locales/xx.json) so this works
// the same from a top-level page (index.html) and a nested one
// (grammatik/akkusativ.html, sprechen/aussprache.html, ...).
function localeUrl(lang) {
  return `/locales/${lang}.json`;
}

function detectInitialLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;

  const nav = (navigator.language || "").slice(0, 2).toLowerCase();
  if (SUPPORTED_LANGS.includes(nav)) return nav;

  return DEFAULT_LANG;
}

async function loadDict(lang) {
  const res = await fetch(localeUrl(lang), { cache: "no-store" });
  if (!res.ok) throw new Error(`i18n: failed to load locale "${lang}" (${res.status})`);
  return res.json();
}

// dotted-path lookup: t("auth.login_button")
export function t(key, fallback) {
  const parts = key.split(".");
  let node = dict;
  for (const p of parts) {
    if (node == null) break;
    node = node[p];
  }
  return typeof node === "string" ? node : (fallback !== undefined ? fallback : key);
}

export function getLang() {
  return currentLang;
}

function applyTranslations(root = document) {
  root.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });
  root.querySelectorAll("[data-i18n-html]").forEach(el => {
    el.innerHTML = t(el.getAttribute("data-i18n-html"));
  });
  root.querySelectorAll("[data-i18n-title]").forEach(el => {
    el.setAttribute("title", t(el.getAttribute("data-i18n-title")));
  });
  document.documentElement.lang = currentLang;
}

// options.persist: save to localStorage (default true)
// options.onChanged: optional async callback(lang) — e.g. sync to Firestore
export async function setLang(lang, { persist = true, onChanged } = {}) {
  if (!SUPPORTED_LANGS.includes(lang)) return currentLang;
  dict = await loadDict(lang);
  currentLang = lang;
  if (persist) localStorage.setItem(STORAGE_KEY, lang);
  applyTranslations();
  listeners.forEach(fn => fn(lang));
  if (onChanged) {
    try { await onChanged(lang); } catch (e) { console.warn("i18n onChanged failed:", e); }
  }
  return lang;
}

export function onLangChange(fn) {
  listeners.push(fn);
}

// Call once per page load, as early as possible (before rendering
// depends on translated strings).
export async function initI18n() {
  currentLang = detectInitialLang();
  try {
    dict = await loadDict(currentLang);
  } catch (e) {
    console.warn(e);
    currentLang = DEFAULT_LANG;
    dict = await loadDict(DEFAULT_LANG);
  }
  applyTranslations();
  return currentLang;
}

export function hasChosenLang() {
  return !!localStorage.getItem(STORAGE_KEY);
}
