// ═══════════════════════════════════════════════════════
//  Deutsch Lernen — Bottom Navigation (mobile only, app-style)
//  js/bottom-nav.js
//
//  Desktop keeps the existing top nav-links (already hidden below
//  ~800px on most pages). This renders a fixed tab bar at the
//  bottom of the screen that only shows on mobile widths — see
//  css/bottom-nav.css for the breakpoint.
//
//  Usage on any page, right before </body>:
//    <script type="module">
//      import { renderBottomNav } from "/js/bottom-nav.js";
//      renderBottomNav();
//    </script>
// ═══════════════════════════════════════════════════════

const ITEMS = [
  { href: "dashboard.html",   icon: "🏠", label: "Home",    match: ["dashboard.html", ""] },
  { href: "vokabelquiz.html", icon: "📝", label: "Quiz",    match: ["vokabelquiz.html", "quiz-a1.html", "quiz-a2.html", "quiz-b1.html", "quiz-b2.html", "quiz-c1.html", "quiz-c2.html"] },
  { href: "woerterbuch.html", icon: "📚", label: "Wörter",  match: ["woerterbuch.html", "woerterbuch-a1.html", "woerterbuch-a2.html", "woerterbuch-b1.html", "woerterbuch-b2.html", "woerterbuch-c1.html", "woerterbuch-c2.html"] },
  { href: "lernreise.html",   icon: "🗺️", label: "Journey", match: ["lernreise.html"] },
  { href: "mein-profil.html", icon: "👤", label: "Profil",  match: ["mein-profil.html"] },
];

export function renderBottomNav() {
  if (document.querySelector(".dl-bottom-nav")) return; // don't double-render

  const current = (location.pathname.split("/").pop() || "dashboard.html").toLowerCase();

  const nav = document.createElement("nav");
  nav.className = "dl-bottom-nav";
  nav.innerHTML = ITEMS.map(it => {
    const active = it.match.includes(current);
    return `<a href="${it.href}" class="dl-bn-item${active ? " active" : ""}">
      <span class="dl-bn-icon">${it.icon}</span>
      <span class="dl-bn-label">${it.label}</span>
    </a>`;
  }).join("");

  document.body.appendChild(nav);
}
