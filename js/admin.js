// ═══════════════════════════════════════════════════
//  Deutsch Lernen — Admin Panel Logic
//  js/admin.js
// ═══════════════════════════════════════════════════
import {
  auth, db, signOut, requireAuth,
  doc, getDoc, setDoc, updateDoc, addDoc, deleteDoc,
  collection, getDocs, query, where, orderBy, limit, serverTimestamp,
} from "./firebase-config.js";

/* ===================== STATE ===================== */
let currentUser = null;
let allUsers = [];
let allPassages = [];
let allLessons = [];
let allVocab = [];
let allPayments = [];
let allWritings = [];

const LEVELS = [
  { label:"A1", name:"Anfänger",        min:0,     max:13900 },
  { label:"A2", name:"Grundstufe",      min:13900, max:27800 },
  { label:"B1", name:"Mittelstufe",     min:27800, max:44000 },
  { label:"B2", name:"Oberstufe",       min:44000, max:52700 },
  { label:"C1", name:"Fortgeschritten", min:52700, max:61300 },
  { label:"C2", name:"Meisterschaft",   min:61300, max:Infinity },
];
function levelForXp(xp) {
  xp = xp || 0;
  for (const l of LEVELS) if (xp >= l.min && xp < l.max) return l.label;
  return "C2";
}
function fmtDate(ts) {
  try {
    if (!ts) return "—";
    const d = typeof ts.toDate === "function" ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString("bn-BD", { year:"numeric", month:"short", day:"numeric" });
  } catch { return "—"; }
}
function esc(str) {
  return String(str ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}

/* ===================== TOAST ===================== */
let toastTimer = null;
function showToast(msg, type) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.className = "toast show" + (type ? " " + type : "");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.classList.remove("show"); }, 2800);
}

/* ===================== CONFIRM MODAL ===================== */
let pendingConfirmAction = null;
function openConfirm(title, text, onConfirm) {
  document.getElementById("confirm-modal-title").textContent = title;
  document.getElementById("confirm-modal-text").textContent = text;
  pendingConfirmAction = onConfirm;
  document.getElementById("confirm-modal-overlay").classList.add("show");
}
function closeConfirm() {
  document.getElementById("confirm-modal-overlay").classList.remove("show");
  pendingConfirmAction = null;
}
document.getElementById("confirm-modal-action-btn").addEventListener("click", async () => {
  if (pendingConfirmAction) {
    const fn = pendingConfirmAction;
    closeConfirm();
    await fn();
  }
});

/* ===================== TAB SWITCHING ===================== */
document.querySelectorAll(".admin-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById("tab-" + tab.dataset.tab).classList.add("active");
  });
});
document.querySelectorAll(".csub-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".csub-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".csub-panel").forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById("csub-" + tab.dataset.csub).classList.add("active");
  });
});

/* ===================== LOAD DATA ===================== */
async function loadAllData() {
  const [usersSnap, passagesSnap, lessonsSnap, vocabSnap, paymentsSnap, writingsSnap] = await Promise.all([
    getDocs(collection(db, "users")),
    getDocs(collection(db, "reading_passages")),
    getDocs(collection(db, "grammar_lessons")),
    getDocs(collection(db, "vocab_words")),
    getDocs(query(collection(db, "payment_requests"), orderBy("createdAt", "desc"), limit(300))),
    getDocs(query(collection(db, "writings"), orderBy("createdAt", "desc"), limit(300))),
  ]);
  allUsers    = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  allPassages = passagesSnap.docs.map(d => ({ slug: d.id, ...d.data() }));
  allLessons  = lessonsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  allVocab    = vocabSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  allPayments = paymentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  allWritings = writingsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

  renderOverview();
  renderUsersTable();
  renderPassagesTable();
  renderLessonsTable();
  renderVocabTable();
  renderPaymentsTable();
  renderWritingsTable();
}

/* ===================== OVERVIEW TAB ===================== */
function renderOverview() {
  document.getElementById("stat-total-users").textContent    = allUsers.length;
  document.getElementById("stat-banned-users").textContent   = allUsers.filter(u => u.banned).length;
  document.getElementById("stat-total-passages").textContent = allPassages.length;
  document.getElementById("stat-total-lessons").textContent  = allLessons.length;
  document.getElementById("stat-total-words").textContent    = allVocab.length;
  document.getElementById("stat-total-xp").textContent       = allUsers.reduce((s,u) => s + (u.xp||0), 0).toLocaleString();

  const top = [...allUsers].sort((a,b) => (b.xp||0) - (a.xp||0)).slice(0, 10);
  const topBody = document.getElementById("top-learners-body");
  topBody.innerHTML = top.length ? top.map((u, i) => `
    <tr>
      <td>${i+1}</td>
      <td><div class="user-cell"><div class="user-cell-avatar">${avatarHtml(u)}</div><div class="user-cell-name">${esc(u.displayName||"—")}</div></div></td>
      <td>${esc(u.email||"—")}</td>
      <td>${u.xp||0}</td>
      <td>${levelForXp(u.xp)}</td>
      <td>🔥 ${u.streak||0}</td>
    </tr>`).join("") : `<tr><td colspan="6" class="empty-row">কোনো user নেই</td></tr>`;

  const recent = [...allUsers].sort((a,b) => (toMillis(b.createdAt)) - (toMillis(a.createdAt))).slice(0, 8);
  const recentBody = document.getElementById("recent-signups-body");
  recentBody.innerHTML = recent.length ? recent.map(u => `
    <tr>
      <td><div class="user-cell"><div class="user-cell-avatar">${avatarHtml(u)}</div><div class="user-cell-name">${esc(u.displayName||"—")}</div></div></td>
      <td>${esc(u.email||"—")}</td>
      <td>${fmtDate(u.createdAt)}</td>
    </tr>`).join("") : `<tr><td colspan="3" class="empty-row">কোনো user নেই</td></tr>`;
}
function toMillis(ts) {
  try { return typeof ts?.toDate === "function" ? ts.toDate().getTime() : new Date(ts).getTime() || 0; }
  catch { return 0; }
}
function avatarHtml(u) {
  if (u.photoURL) return `<img src="${esc(u.photoURL)}" alt="">`;
  return esc((u.displayName || "?")[0]?.toUpperCase() || "?");
}

/* ===================== USERS TAB ===================== */
let userFilter = "all";
let userSearch = "";

document.querySelectorAll("#user-filter-tabs .ftab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll("#user-filter-tabs .ftab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    userFilter = tab.dataset.filter;
    renderUsersTable();
  });
});
document.getElementById("user-search-input").addEventListener("input", e => {
  userSearch = e.target.value.toLowerCase();
  renderUsersTable();
});

function renderUsersTable() {
  let list = [...allUsers];
  if (userFilter === "admin")  list = list.filter(u => u.role === "admin");
  if (userFilter === "banned") list = list.filter(u => u.banned);
  if (userFilter === "paid")   list = list.filter(u => u.plan && planIsActive(u));
  if (userSearch) list = list.filter(u =>
    (u.displayName||"").toLowerCase().includes(userSearch) ||
    (u.email||"").toLowerCase().includes(userSearch));

  document.getElementById("user-count-badge").textContent = list.length;
  const body = document.getElementById("users-body");
  body.innerHTML = list.length ? list.map(u => `
    <tr>
      <td><div class="user-cell"><div class="user-cell-avatar">${avatarHtml(u)}</div><div class="user-cell-name">${esc(u.displayName||"—")}</div></div></td>
      <td>${esc(u.email||"—")}</td>
      <td>${u.xp||0}</td>
      <td>🔥 ${u.streak||0}</td>
      <td>${planCellHtml(u)}</td>
      <td>
        <span class="pill ${u.banned?'pill-banned':'pill-active'}">${u.banned?'Banned':'Active'}</span>
        <span class="pill ${u.role==='admin'?'pill-admin':'pill-user'}">${u.role==='admin'?'Admin':'User'}</span>
      </td>
      <td>${fmtDate(u.createdAt)}</td>
      <td>
        <div class="row-actions">
          <button class="action-btn warn" data-action="toggle-admin" data-uid="${u.id}" data-role="${u.role||'user'}">${u.role==='admin'?'Remove Admin':'Make Admin'}</button>
          <button class="action-btn danger" data-action="toggle-ban" data-uid="${u.id}" data-banned="${!!u.banned}">${u.banned?'Unban':'Ban'}</button>
          <button class="action-btn" data-action="open-grant" data-uid="${u.id}">Grant Plan</button>
        </div>
      </td>
    </tr>`).join("") : `<tr><td colspan="8" class="empty-row">কোনো user পাওয়া যায়নি</td></tr>`;
}
function planIsActive(u) {
  if (!u.plan) return false;
  const exp = u.planExpiry?.toDate ? u.planExpiry.toDate() : (u.planExpiry ? new Date(u.planExpiry) : null);
  return exp && exp > new Date();
}
function planCellHtml(u) {
  if (!u.plan) return `<span class="badge-muted">Free</span>`;
  const active = planIsActive(u);
  const label = { monthly:"Monthly", sixmonths:"6 Months", yearly:"Yearly" }[u.plan] || esc(u.plan);
  return `<span class="pill ${active?'pill-active':'pill-banned'}">${label}${active?'':' (Expired)'}</span>`;
}

async function toggleAdmin(uid, currentRole) {
  const makingAdmin = currentRole !== "admin";
  openConfirm(
    makingAdmin ? "Admin বানাবেন?" : "Admin বাতিল করবেন?",
    makingAdmin ? "এই user-কে admin access দিলে সে এই panel-এ ঢুকতে ও সব content/user manage করতে পারবে।"
                : "এই user আর admin panel-এ ঢুকতে পারবে না।",
    async () => {
      try {
        await updateDoc(doc(db, "users", uid), { role: makingAdmin ? "admin" : "user" });
        const u = allUsers.find(x => x.id === uid);
        if (u) u.role = makingAdmin ? "admin" : "user";
        renderUsersTable();
        renderOverview();
        showToast(makingAdmin ? "Admin করা হয়েছে ✅" : "Admin বাতিল করা হয়েছে", "ok");
      } catch (e) { showToast("ব্যর্থ: " + e.message, "err"); }
    }
  );
}
async function toggleBan(uid, currentBanned) {
  const willBan = !currentBanned;
  openConfirm(
    willBan ? "User ব্যান করবেন?" : "Ban তুলে দেবেন?",
    willBan ? "ব্যান করা হলে এই user আর login করে content access করতে পারবে না (security rule-এ enforce করতে হবে)।"
            : "এই user আবার স্বাভাবিকভাবে app ব্যবহার করতে পারবে।",
    async () => {
      try {
        await updateDoc(doc(db, "users", uid), { banned: willBan });
        const u = allUsers.find(x => x.id === uid);
        if (u) u.banned = willBan;
        renderUsersTable();
        renderOverview();
        showToast(willBan ? "User ব্যান করা হয়েছে" : "Ban তুলে দেওয়া হয়েছে", "ok");
      } catch (e) { showToast("ব্যর্থ: " + e.message, "err"); }
    }
  );
}

/* ===================== PASSAGES (reading_passages) ===================== */
function renderPassagesTable() {
  document.getElementById("passage-count-badge").textContent = allPassages.length;
  const body = document.getElementById("passages-body");
  body.innerHTML = allPassages.length ? allPassages
    .sort((a,b) => (a.level||"").localeCompare(b.level||""))
    .map(p => `
    <tr>
      <td>${p.icon||"📖"} ${esc(p.titleDe||p.slug)}</td>
      <td>${esc(p.category||"—")}</td>
      <td>${esc(p.level||"—")}</td>
      <td>${(p.questions||[]).length}</td>
      <td>⚡${p.xp ?? 25}</td>
      <td>
        <div class="row-actions">
          <button class="action-btn" data-action="edit-passage" data-slug="${esc(p.slug)}">Edit</button>
          <button class="action-btn danger" data-action="delete-passage" data-slug="${esc(p.slug)}">Delete</button>
        </div>
      </td>
    </tr>`).join("") : `<tr><td colspan="6" class="empty-row">কোনো passage নেই — উপরে "+ Neue Passage" চাপুন</td></tr>`;
}

function addQuestionBlock(data) {
  const tpl = document.getElementById("qb-template");
  const node = tpl.content.cloneNode(true);
  if (data) {
    node.querySelector('[data-field="q"]').value = data.q || "";
    node.querySelector('[data-field="opt0"]').value = data.opts?.[0] || "";
    node.querySelector('[data-field="opt1"]').value = data.opts?.[1] || "";
    node.querySelector('[data-field="opt2"]').value = data.opts?.[2] || "";
    node.querySelector('[data-field="opt3"]').value = data.opts?.[3] || "";
    node.querySelector('[data-field="correct"]').value = String(data.correct ?? 0);
  }
  document.getElementById("pm-questions").appendChild(node);
}
document.getElementById("pm-questions").addEventListener("click", e => {
  if (e.target.dataset.action === "remove-question") {
    e.target.closest(".qb-block").remove();
  }
});
document.querySelector('[data-action="add-question"]').addEventListener("click", () => addQuestionBlock());

function slugify(str) {
  return (str||"").toLowerCase().trim()
    .replace(/[äöü]/g, m => ({ä:"ae",ö:"oe",ü:"ue"}[m]))
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
function autoParagraphs(text) {
  if (!text) return "";
  if (/<p[ >]/i.test(text)) return text; // already has <p> tags, leave as-is
  return text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean).map(p => `<p>${p}</p>`).join("\n");
}
function autoLineBreaks(text) {
  if (!text) return "";
  if (/<br/i.test(text)) return text;
  return text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean).join("<br><br>");
}

function openPassageModal(slug) {
  document.getElementById("pm-questions").innerHTML = "";
  const p = slug ? allPassages.find(x => x.slug === slug) : null;

  document.getElementById("passage-modal-title").textContent = p ? "Passage Edit করো" : "Neue Passage";
  document.getElementById("pm-slug-original").value = slug || "";
  document.getElementById("pm-slug").value     = p?.slug || "";
  document.getElementById("pm-slug").disabled  = !!p; // slug locked once created (it's the doc id)
  document.getElementById("pm-titlede").value  = p?.titleDe || "";
  document.getElementById("pm-titlebn").value  = p?.titleBn || "";
  document.getElementById("pm-descbn").value   = p?.descBn || "";
  document.getElementById("pm-level").value    = p?.level || "A2";
  document.getElementById("pm-category").value = p?.category || "Alltag";
  document.getElementById("pm-icon").value     = p?.icon || "📖";
  document.getElementById("pm-color").value    = p?.color || "gold";
  document.getElementById("pm-words").value    = p?.words || 110;
  document.getElementById("pm-time").value     = p?.time || 3;
  document.getElementById("pm-xp").value       = p?.xp ?? 25;
  document.getElementById("pm-textde").value   = p?.textDe || "";
  document.getElementById("pm-textbn").value   = p?.textBn || "";

  const questions = p?.questions?.length ? p.questions : [null];
  questions.forEach(q => addQuestionBlock(q));

  document.getElementById("passage-modal-overlay").classList.add("show");
}
function closePassageModal() {
  document.getElementById("passage-modal-overlay").classList.remove("show");
}

async function savePassage() {
  const isEdit = !!document.getElementById("pm-slug-original").value;
  const slug = isEdit ? document.getElementById("pm-slug-original").value : slugify(document.getElementById("pm-slug").value);

  if (!slug) { showToast("Slug লিখুন (e.g. im-park)", "err"); return; }
  const titleDe = document.getElementById("pm-titlede").value.trim();
  if (!titleDe) { showToast("German Titel লিখুন", "err"); return; }

  const questions = [];
  for (const block of document.querySelectorAll("#pm-questions .qb-block")) {
    const q = block.querySelector('[data-field="q"]').value.trim();
    const opts = [0,1,2,3].map(i => block.querySelector(`[data-field="opt${i}"]`).value.trim());
    const correct = Number(block.querySelector('[data-field="correct"]').value);
    if (!q || opts.some(o => !o)) { continue; } // skip incomplete rows silently
    questions.push({ q, opts, correct });
  }
  if (!questions.length) { showToast("অন্তত একটা সম্পূর্ণ প্রশ্ন (৪টা option সহ) যোগ করুন", "err"); return; }

  const data = {
    titleDe,
    titleBn: document.getElementById("pm-titlebn").value.trim(),
    descBn:  document.getElementById("pm-descbn").value.trim(),
    level:   document.getElementById("pm-level").value,
    category:document.getElementById("pm-category").value,
    icon:    document.getElementById("pm-icon").value.trim() || "📖",
    color:   document.getElementById("pm-color").value,
    words:   Number(document.getElementById("pm-words").value) || 0,
    time:    Number(document.getElementById("pm-time").value) || 0,
    xp:      Number(document.getElementById("pm-xp").value) || 25,
    textDe:  autoParagraphs(document.getElementById("pm-textde").value.trim()),
    textBn:  autoLineBreaks(document.getElementById("pm-textbn").value.trim()),
    questions,
    updatedAt: serverTimestamp(),
  };

  try {
    await setDoc(doc(db, "reading_passages", slug), data, { merge: true });
    if (isEdit) {
      const idx = allPassages.findIndex(x => x.slug === slug);
      if (idx > -1) allPassages[idx] = { slug, ...data };
    } else {
      allPassages.push({ slug, ...data });
    }
    renderPassagesTable();
    renderOverview();
    closePassageModal();
    showToast("Passage save হয়েছে ✅", "ok");
  } catch (e) {
    showToast("Save ব্যর্থ: " + e.message, "err");
  }
}

function deletePassage(slug) {
  const p = allPassages.find(x => x.slug === slug);
  openConfirm(
    "Passage মুছে ফেলবেন?",
    `"${p?.titleDe || slug}" passage-টা স্থায়ীভাবে মুছে যাবে। এই কাজ undo করা যাবে না।`,
    async () => {
      try {
        await deleteDoc(doc(db, "reading_passages", slug));
        allPassages = allPassages.filter(x => x.slug !== slug);
        renderPassagesTable();
        renderOverview();
        showToast("Passage মুছে ফেলা হয়েছে", "ok");
      } catch (e) { showToast("ব্যর্থ: " + e.message, "err"); }
    }
  );
}

/* ===================== GRAMMAR LESSONS (grammar_lessons) ===================== */
function renderLessonsTable() {
  document.getElementById("lesson-count-badge").textContent = allLessons.length;
  const body = document.getElementById("lessons-body");
  body.innerHTML = allLessons.length ? allLessons.map(l => `
    <tr>
      <td>${l.icon||"📘"} ${esc(l.title||"—")}</td>
      <td>${esc(l.category||"—")}</td>
      <td>${esc(l.level||"—")}</td>
      <td>
        <div class="row-actions">
          <button class="action-btn" data-action="edit-lesson" data-id="${esc(l.id)}">Edit</button>
          <button class="action-btn danger" data-action="delete-lesson" data-id="${esc(l.id)}">Delete</button>
        </div>
      </td>
    </tr>`).join("") : `<tr><td colspan="4" class="empty-row">কোনো lesson নেই — উপরে "+ Neue Lesson" চাপুন</td></tr>`;
}

function openLessonModal(id) {
  const l = id ? allLessons.find(x => x.id === id) : null;
  document.getElementById("lesson-modal-title").textContent = l ? "Lesson Edit করো" : "Neue Grammar Lesson";
  document.getElementById("lm-id").value          = id || "";
  document.getElementById("lm-title").value       = l?.title || "";
  document.getElementById("lm-category").value    = l?.category || "";
  document.getElementById("lm-level").value       = l?.level || "beginner";
  document.getElementById("lm-icon").value        = l?.icon || "📊";
  document.getElementById("lm-explanation").value = l?.explanation || "";
  document.getElementById("lm-formula").value     = l?.formula || "";
  document.getElementById("lm-examples").value    = (l?.examples || []).join("\n");
  document.getElementById("lesson-modal-overlay").classList.add("show");
}
function closeLessonModal() {
  document.getElementById("lesson-modal-overlay").classList.remove("show");
}
async function saveLesson() {
  const id = document.getElementById("lm-id").value;
  const title = document.getElementById("lm-title").value.trim();
  if (!title) { showToast("Title লিখুন", "err"); return; }

  const data = {
    title,
    category:    document.getElementById("lm-category").value.trim(),
    level:       document.getElementById("lm-level").value,
    icon:        document.getElementById("lm-icon").value.trim() || "📊",
    explanation: document.getElementById("lm-explanation").value.trim(),
    formula:     document.getElementById("lm-formula").value.trim(),
    examples:    document.getElementById("lm-examples").value.split("\n").map(s => s.trim()).filter(Boolean),
  };

  try {
    if (id) {
      await updateDoc(doc(db, "grammar_lessons", id), data);
      const idx = allLessons.findIndex(x => x.id === id);
      if (idx > -1) allLessons[idx] = { id, ...data };
    } else {
      data.createdAt = serverTimestamp();
      const ref = await addDoc(collection(db, "grammar_lessons"), data);
      allLessons.push({ id: ref.id, ...data });
    }
    renderLessonsTable();
    renderOverview();
    closeLessonModal();
    showToast("Lesson save হয়েছে ✅", "ok");
  } catch (e) { showToast("Save ব্যর্থ: " + e.message, "err"); }
}
function deleteLesson(id) {
  const l = allLessons.find(x => x.id === id);
  openConfirm(
    "Lesson মুছে ফেলবেন?",
    `"${l?.title || ""}" lesson-টা স্থায়ীভাবে মুছে যাবে।`,
    async () => {
      try {
        await deleteDoc(doc(db, "grammar_lessons", id));
        allLessons = allLessons.filter(x => x.id !== id);
        renderLessonsTable();
        renderOverview();
        showToast("Lesson মুছে ফেলা হয়েছে", "ok");
      } catch (e) { showToast("ব্যর্থ: " + e.message, "err"); }
    }
  );
}

/* ===================== VOCAB WORDS (vocab_words) ===================== */
function renderVocabTable() {
  document.getElementById("vocab-count-badge").textContent = allVocab.length;
  const body = document.getElementById("vocab-body");
  body.innerHTML = allVocab.length ? allVocab.map(v => `
    <tr>
      <td>${esc(v.german||"—")}</td>
      <td>${esc(v.bengali||"—")}</td>
      <td>${esc(v.category||"—")}</td>
      <td>${esc(v.level||"—")}</td>
      <td>
        <div class="row-actions">
          <button class="action-btn" data-action="edit-vocab" data-id="${esc(v.id)}">Edit</button>
          <button class="action-btn danger" data-action="delete-vocab" data-id="${esc(v.id)}">Delete</button>
        </div>
      </td>
    </tr>`).join("") : `<tr><td colspan="5" class="empty-row">কোনো word নেই — উপরে "+ Neues Wort" চাপুন</td></tr>`;
}
function openVocabModal(id) {
  const v = id ? allVocab.find(x => x.id === id) : null;
  document.getElementById("vocab-modal-title").textContent = v ? "Word Edit করো" : "Neues Wort";
  document.getElementById("vm-id").value       = id || "";
  document.getElementById("vm-german").value   = v?.german || "";
  document.getElementById("vm-bengali").value  = v?.bengali || "";
  document.getElementById("vm-category").value = v?.category || "";
  document.getElementById("vm-level").value    = v?.level || "A1";
  document.getElementById("vm-example").value  = v?.example || "";
  document.getElementById("vm-audiourl").value = v?.audioUrl || "";
  document.getElementById("vocab-modal-overlay").classList.add("show");
}
function closeVocabModal() {
  document.getElementById("vocab-modal-overlay").classList.remove("show");
}
async function saveVocab() {
  const id = document.getElementById("vm-id").value;
  const german = document.getElementById("vm-german").value.trim();
  const bengali = document.getElementById("vm-bengali").value.trim();
  if (!german || !bengali) { showToast("German ও Bengali — দুটোই লিখুন", "err"); return; }

  const data = {
    german, bengali,
    category: document.getElementById("vm-category").value.trim(),
    level:    document.getElementById("vm-level").value,
    example:  document.getElementById("vm-example").value.trim(),
    audioUrl: document.getElementById("vm-audiourl").value.trim(),
  };

  try {
    if (id) {
      await updateDoc(doc(db, "vocab_words", id), data);
      const idx = allVocab.findIndex(x => x.id === id);
      if (idx > -1) allVocab[idx] = { id, ...data };
    } else {
      const ref = await addDoc(collection(db, "vocab_words"), data);
      allVocab.push({ id: ref.id, ...data });
    }
    renderVocabTable();
    renderOverview();
    closeVocabModal();
    showToast("Word save হয়েছে ✅", "ok");
  } catch (e) { showToast("Save ব্যর্থ: " + e.message, "err"); }
}
function deleteVocab(id) {
  const v = allVocab.find(x => x.id === id);
  openConfirm(
    "Word মুছে ফেলবেন?",
    `"${v?.german || ""}" word-টা স্থায়ীভাবে মুছে যাবে।`,
    async () => {
      try {
        await deleteDoc(doc(db, "vocab_words", id));
        allVocab = allVocab.filter(x => x.id !== id);
        renderVocabTable();
        renderOverview();
        showToast("Word মুছে ফেলা হয়েছে", "ok");
      } catch (e) { showToast("ব্যর্থ: " + e.message, "err"); }
    }
  );
}

/* ===================== PAYMENTS (payment_requests) ===================== */
const PLAN_LABELS = {
  monthly:   { label: "Monthly (১ মাস)",  days: 30  },
  sixmonths: { label: "6 Months (৬ মাস)", days: 180 },
  yearly:    { label: "1 Year (১ বছর)",    days: 365 },
};
let payFilter = "pending";
let paySearch = "";

document.querySelectorAll("#pay-filter-tabs .ftab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll("#pay-filter-tabs .ftab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    payFilter = tab.dataset.filter;
    renderPaymentsTable();
  });
});
document.getElementById("pay-search-input").addEventListener("input", e => {
  paySearch = e.target.value.toLowerCase();
  renderPaymentsTable();
});

function renderPaymentsTable() {
  let list = [...allPayments];
  if (payFilter !== "all") list = list.filter(p => (p.status || "pending") === payFilter);
  if (paySearch) list = list.filter(p =>
    (p.transactionId||"").toLowerCase().includes(paySearch) ||
    (p.email||"").toLowerCase().includes(paySearch) ||
    (p.name||"").toLowerCase().includes(paySearch));

  document.getElementById("pay-count-badge").textContent = list.length;
  const pendingCount = allPayments.filter(p => (p.status||"pending") === "pending").length;
  const badge = document.getElementById("pending-badge");
  if (pendingCount > 0) { badge.style.display = "inline-block"; badge.textContent = pendingCount; }
  else badge.style.display = "none";

  const body = document.getElementById("pay-tbody");
  body.innerHTML = list.length ? list.map(p => {
    const status = p.status || "pending";
    const isPending = status === "pending";
    return `
    <tr>
      <td><div class="user-cell-name">${esc(p.name||"—")}</div><div style="font-size:11px;color:var(--muted);">${esc(p.email||"—")}</div></td>
      <td>${esc(PLAN_LABELS[p.plan]?.label || p.plan || "—")}</td>
      <td>৳${p.amount ?? "—"}</td>
      <td>${esc(p.paymentMethod||"bKash")}</td>
      <td><span class="txn-code">${esc(p.transactionId||"—")}</span></td>
      <td>${esc(p.senderNumber||"—")}</td>
      <td><span class="status-pill sp-${status}">${status}</span></td>
      <td>${fmtDate(p.createdAt)}</td>
      <td>
        <div class="row-actions">
          <button class="action-btn btn-approve" data-action="approve-payment" data-id="${p.id}" ${isPending?'':'disabled'}>Approve</button>
          <button class="action-btn btn-reject" data-action="reject-payment" data-id="${p.id}" ${isPending?'':'disabled'}>Reject</button>
        </div>
      </td>
    </tr>`;
  }).join("") : `<tr><td colspan="9" class="empty-row">কোনো request পাওয়া যায়নি</td></tr>`;
}

async function approvePayment(id) {
  const p = allPayments.find(x => x.id === id);
  if (!p) return;
  const planInfo = PLAN_LABELS[p.plan];
  const days = planInfo?.days || 30;
  openConfirm(
    "Payment Approve করবেন?",
    `${p.name || p.email}-কে "${planInfo?.label || p.plan}" plan দেওয়া হবে (${days} দিনের জন্য active থাকবে)।`,
    async () => {
      try {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + days);
        await updateDoc(doc(db, "users", p.uid), {
          plan: p.plan,
          planProvider: "bkash-manual",
          planStart: serverTimestamp(),
          planExpiry: expiry,
        });
        await updateDoc(doc(db, "payment_requests", id), {
          status: "approved",
          approvedAt: serverTimestamp(),
          approvedBy: currentUser.uid,
        });
        p.status = "approved";
        const u = allUsers.find(x => x.id === p.uid);
        if (u) { u.plan = p.plan; u.planExpiry = expiry; u.planProvider = "bkash-manual"; }
        renderPaymentsTable();
        renderUsersTable();
        showToast("Payment approve হয়েছে, user-কে plan দেওয়া হয়েছে ✅", "ok");
      } catch (e) { showToast("ব্যর্থ: " + e.message, "err"); }
    }
  );
}
async function rejectPayment(id) {
  const p = allPayments.find(x => x.id === id);
  openConfirm(
    "Payment Reject করবেন?",
    `"${p?.transactionId || ""}" — এই request reject করা হবে। User-কে কোনো plan দেওয়া হবে না।`,
    async () => {
      try {
        await updateDoc(doc(db, "payment_requests", id), {
          status: "rejected",
          rejectedAt: serverTimestamp(),
          rejectedBy: currentUser.uid,
        });
        if (p) p.status = "rejected";
        renderPaymentsTable();
        showToast("Reject করা হয়েছে", "ok");
      } catch (e) { showToast("ব্যর্থ: " + e.message, "err"); }
    }
  );
}

/* ===================== GRANT PLAN MANUALLY ===================== */
let grantSelectedDays = null;
document.querySelectorAll("#gm-plan-pills .plan-pill-opt").forEach(el => {
  el.addEventListener("click", () => {
    document.querySelectorAll("#gm-plan-pills .plan-pill-opt").forEach(x => x.classList.remove("selected"));
    el.classList.add("selected");
    grantSelectedDays = Number(el.dataset.days);
    document.getElementById("gm-days").value = grantSelectedDays;
  });
});
function openGrantModal(uid) {
  const u = allUsers.find(x => x.id === uid);
  document.getElementById("gm-uid").value = uid;
  document.getElementById("gm-user-label").textContent = `${u?.displayName || "—"} (${u?.email || "—"})`;
  document.getElementById("gm-days").value = "";
  grantSelectedDays = null;
  document.querySelectorAll("#gm-plan-pills .plan-pill-opt").forEach(x => x.classList.remove("selected"));
  document.getElementById("grant-modal-overlay").classList.add("show");
}
function closeGrantModal() {
  document.getElementById("grant-modal-overlay").classList.remove("show");
}
async function saveGrant() {
  const uid = document.getElementById("gm-uid").value;
  const days = Number(document.getElementById("gm-days").value);
  if (!uid || !days || days < 1) { showToast("সঠিক দিন সংখ্যা দিন", "err"); return; }
  const selectedPill = document.querySelector("#gm-plan-pills .plan-pill-opt.selected");
  const planKey = selectedPill ? selectedPill.dataset.plan : "custom";

  try {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + days);
    await updateDoc(doc(db, "users", uid), {
      plan: planKey,
      planProvider: "admin-manual",
      planStart: serverTimestamp(),
      planExpiry: expiry,
    });
    const u = allUsers.find(x => x.id === uid);
    if (u) { u.plan = planKey; u.planExpiry = expiry; u.planProvider = "admin-manual"; }
    renderUsersTable();
    closeGrantModal();
    showToast(`Plan grant হয়েছে (${days} দিন) ✅`, "ok");
  } catch (e) { showToast("ব্যর্থ: " + e.message, "err"); }
}

/* ===================== WRITINGS (writings — AI feedback log) ===================== */
let writingFilter = "all";
let writingSearch = "";

document.querySelectorAll("#writing-filter-tabs .ftab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll("#writing-filter-tabs .ftab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    writingFilter = tab.dataset.filter;
    renderWritingsTable();
  });
});
document.getElementById("writing-search-input").addEventListener("input", e => {
  writingSearch = e.target.value.toLowerCase();
  renderWritingsTable();
});

function scoreClass(score) {
  if (score >= 80) return "ws-high";
  if (score >= 50) return "ws-mid";
  return "ws-low";
}
function userLabel(uid) {
  const u = allUsers.find(x => x.id === uid);
  return u ? (u.displayName || u.email || uid) : uid;
}
function renderWritingsTable() {
  // Stats
  const total = allWritings.length;
  const todayKey = new Date().toISOString().slice(0, 10);
  const todayCount = allWritings.filter(w => toMillis(w.createdAt) && new Date(toMillis(w.createdAt)).toISOString().slice(0,10) === todayKey).length;
  const avgScore = total ? Math.round(allWritings.reduce((s,w) => s + (w.score||0), 0) / total) : 0;
  const totalXp = allWritings.reduce((s,w) => s + (w.xpAwarded||0), 0);
  document.getElementById("stat-writings-total").textContent = total;
  document.getElementById("stat-writings-today").textContent = todayCount;
  document.getElementById("stat-writings-avg-score").textContent = total ? avgScore : "—";
  document.getElementById("stat-writings-xp").textContent = totalXp;

  let list = [...allWritings];
  if (writingFilter !== "all") list = list.filter(w => w.level === writingFilter);
  if (writingSearch) list = list.filter(w => userLabel(w.uid).toLowerCase().includes(writingSearch));

  document.getElementById("writing-count-badge").textContent = list.length;
  const body = document.getElementById("writings-body");
  body.innerHTML = list.length ? list.map(w => `
    <tr>
      <td>${esc(userLabel(w.uid))}</td>
      <td>${esc(w.level||"—")}</td>
      <td><span class="writing-score ${scoreClass(w.score||0)}">${w.score ?? "—"}</span></td>
      <td>+${w.xpAwarded ?? 0}</td>
      <td><span class="writing-preview" data-action="view-writing" data-id="${esc(w.id)}">${esc((w.text||"").slice(0,60))}${(w.text||"").length>60?"...":""}</span></td>
      <td>${fmtDate(w.createdAt)}</td>
    </tr>`).join("") : `<tr><td colspan="6" class="empty-row">কোনো submission পাওয়া যায়নি</td></tr>`;
}
function openWritingModal(id) {
  const w = allWritings.find(x => x.id === id);
  if (!w) return;
  document.getElementById("writing-modal-body").innerHTML = `
    <div style="margin-bottom:.8rem;"><strong style="color:var(--text);">User:</strong> ${esc(userLabel(w.uid))} · <strong style="color:var(--text);">Level:</strong> ${esc(w.level||"—")} · <strong style="color:var(--text);">Score:</strong> ${w.score ?? "—"}</div>
    <div style="margin-bottom:.4rem;color:var(--gold);font-weight:700;">✍️ Original:</div>
    <div style="margin-bottom:1rem;">${esc(w.text||"—")}</div>
    <div style="margin-bottom:.4rem;color:var(--teal);font-weight:700;">✅ Corrected:</div>
    <div style="margin-bottom:1rem;">${esc(w.correctedText||"—")}</div>
    <div style="margin-bottom:.4rem;color:var(--sky);font-weight:700;">💬 Feedback:</div>
    <div>${esc(w.overallFeedback||"—")}</div>
  `;
  document.getElementById("writing-modal-overlay").classList.add("show");
}
function closeWritingModal() {
  document.getElementById("writing-modal-overlay").classList.remove("show");
}

/* ===================== GLOBAL CLICK DELEGATION ===================== */
document.addEventListener("click", e => {
  const t = e.target.closest("[data-action]");
  if (!t) return;
  const action = t.dataset.action;

  if (action === "logout") { signOut(auth).then(() => location.href = "index.html"); return; }

  if (action === "new-passage")          openPassageModal(null);
  if (action === "close-passage-modal")  closePassageModal();
  if (action === "save-passage")         savePassage();
  if (action === "edit-passage")         openPassageModal(t.dataset.slug);
  if (action === "delete-passage")       deletePassage(t.dataset.slug);

  if (action === "new-lesson")           openLessonModal(null);
  if (action === "close-lesson-modal")   closeLessonModal();
  if (action === "save-lesson")          saveLesson();
  if (action === "edit-lesson")          openLessonModal(t.dataset.id);
  if (action === "delete-lesson")        deleteLesson(t.dataset.id);

  if (action === "new-vocab")            openVocabModal(null);
  if (action === "close-vocab-modal")    closeVocabModal();
  if (action === "save-vocab")           saveVocab();
  if (action === "edit-vocab")           openVocabModal(t.dataset.id);
  if (action === "delete-vocab")         deleteVocab(t.dataset.id);

  if (action === "toggle-admin")         toggleAdmin(t.dataset.uid, t.dataset.role);
  if (action === "toggle-ban")           toggleBan(t.dataset.uid, t.dataset.banned === "true");

  if (action === "approve-payment")      approvePayment(t.dataset.id);
  if (action === "reject-payment")       rejectPayment(t.dataset.id);

  if (action === "open-grant")           openGrantModal(t.dataset.uid);
  if (action === "close-grant-modal")    closeGrantModal();
  if (action === "save-grant")           saveGrant();

  if (action === "view-writing")         openWritingModal(t.dataset.id);
  if (action === "close-writing-modal")  closeWritingModal();

  if (action === "close-confirm-modal")  closeConfirm();
});
// Close a modal when clicking its dark overlay background (outside modal-box)
document.querySelectorAll(".modal-overlay").forEach(ov => {
  ov.addEventListener("click", e => { if (e.target === ov) ov.classList.remove("show"); });
});

/* ===================== AUTH / ACCESS GATE ===================== */
requireAuth(async user => {
  currentUser = user;
  const snap = await getDoc(doc(db, "users", user.uid));
  const d = snap.exists() ? snap.data() : {};

  if (d.role !== "admin") {
    document.getElementById("gate-wrap").innerHTML = `
      <div class="gate-screen">
        <div class="gi">⛔</div>
        <h2>Access Denied</h2>
        <p>এই page শুধু admin-দের জন্য। কয়েক সেকেন্ডের মধ্যে dashboard-এ ফিরিয়ে দেওয়া হচ্ছে...</p>
      </div>`;
    document.getElementById("admin-wrap").style.display = "none";
    setTimeout(() => { location.href = "dashboard.html"; }, 2800);
    return;
  }

  document.getElementById("nav-name").textContent = d.displayName || user.displayName || "Admin";
  const av = document.getElementById("nav-avatar");
  if (d.photoURL) av.innerHTML = `<img src="${esc(d.photoURL)}" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;

  document.getElementById("gate-wrap").style.display = "none";
  document.getElementById("admin-wrap").style.display = "";

  try {
    await loadAllData();
  } catch (e) {
    console.error("Failed to load admin data:", e);
    showToast("Data load করতে সমস্যা হয়েছে: " + e.message, "err");
  }
});
