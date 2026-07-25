// ═══════════════════════════════════════════════════════
//  Deutsch Lernen — Wörterbuch Search
//  js/dict-search.js
//
//  Lightweight live-search over a flat word list:
//    { id, german, bengali, example }
//
//  Usage on a single-level page (woerterbuch-a1.html etc.):
//    import { initDictSearch } from "./js/dict-search.js";
//    initDictSearch({ words: vocabA1 });
//
//  Usage on the hub page (woerterbuch.html), searching across
//  all levels at once — pass words tagged with a `level`:
//    initDictSearch({ words: allWordsWithLevel, crossLevel: true });
// ═══════════════════════════════════════════════════════

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

export function initDictSearch({
  words,
  inputSelector = "#dict-search-input",
  resultsSelector = "#dict-results",
  clearSelector = "#dict-search-clear",
  crossLevel = false,
  maxResults = 40,
  onResultClick = null,
} = {}) {
  const input = document.querySelector(inputSelector);
  const results = document.querySelector(resultsSelector);
  const clearBtn = document.querySelector(clearSelector);
  if (!input || !results) return;

  function render(list, query) {
    if (!query) {
      results.classList.add("hidden");
      results.innerHTML = "";
      return;
    }
    results.classList.remove("hidden");
    if (list.length === 0) {
      results.innerHTML = `<div class="dict-no-results">"${escapeHtml(query)}" এর জন্য কোনো শব্দ পাওয়া যায়নি।</div>`;
      return;
    }
    results.innerHTML = list.slice(0, maxResults).map(w => `
      <div class="dict-result" data-id="${w.id}">
        <div>
          <div class="dr-german">${escapeHtml(w.german)}${crossLevel && w.level ? ` <span style="color:var(--muted);font-size:11px;font-weight:600;">· ${w.level.toUpperCase()}</span>` : ""}</div>
          <div class="dr-bengali">${escapeHtml(w.bengali)}</div>
          ${w.example ? `<div class="dr-example">${escapeHtml(w.example)}</div>` : ""}
        </div>
      </div>
    `).join("");

    if (onResultClick) {
      results.querySelectorAll(".dict-result").forEach(el => {
        el.addEventListener("click", () => {
          const word = list.find(w => w.id === el.dataset.id);
          if (word) onResultClick(word);
        });
        el.style.cursor = "pointer";
      });
    }
  }

  function search(query) {
    const q = query.trim().toLowerCase();
    clearBtn && clearBtn.classList.toggle("show", q.length > 0);
    if (!q) { render([], ""); return; }
    const matches = words.filter(w =>
      w.german.toLowerCase().includes(q) || w.bengali.includes(q)
    );
    // Prefer matches where the word *starts with* the query
    matches.sort((a, b) => {
      const aStarts = a.german.toLowerCase().startsWith(q) ? 0 : 1;
      const bStarts = b.german.toLowerCase().startsWith(q) ? 0 : 1;
      return aStarts - bStarts;
    });
    render(matches, q);
  }

  input.addEventListener("input", () => search(input.value));
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      input.value = "";
      search("");
      input.focus();
    });
  }

  // Support deep-link from hub search: woerterbuch-a1.html?q=Hallo
  const params = new URLSearchParams(location.search);
  const initialQ = params.get("q");
  if (initialQ) {
    input.value = initialQ;
    search(initialQ);
  }
}
