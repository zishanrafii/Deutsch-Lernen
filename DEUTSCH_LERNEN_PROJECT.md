# 🇩🇪 Deutsch Lernen — Project Master Document
> এই file টা নতুন Claude session-এ দিলে সে পুরো project বুঝতে পারবে এবং কাজ চালিয়ে যেতে পারবে।
> **Last updated:** June 2026

---

## 🎯 Project Overview

**নাম:** Deutsch Lernen  
**উদ্দেশ্য:** Bengali learners দের জন্য German ভাষা শেখার web platform  
**Tagline:** "German শিখুন বাংলায় — A1 থেকে C2"  
**Target audience:** বাংলাদেশি ও ভারতীয় Bengali ভাষাভাষী  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML + CSS + JS (ES Modules) |
| Auth | Firebase Authentication (Email + Google) |
| Database | Firebase Firestore |
| Media | Cloudinary (profile photos, audio files) |
| AI | Claude API (writing-lab page-এ) |
| Hosting | Firebase Hosting (recommended) |
| Fonts | Outfit, Noto Sans Bengali, JetBrains Mono (Google Fonts) |

---

## 🔑 Credentials & Config

### Firebase
```js
const firebaseConfig = {
  apiKey:            "AIzaSyBBJn489Bch5U-AYOvHTcFKyIZRre8zlaE",
  authDomain:        "deutsch-lernen-bd.firebaseapp.com",
  projectId:         "deutsch-lernen-bd",
  storageBucket:     "deutsch-lernen-bd.firebasestorage.app",
  messagingSenderId: "310285600287",
  appId:             "1:310285600287:web:0449acabb9decbdcc5b72a",
  measurementId:     "G-8MCPPJB6JS",
};
```

### Cloudinary
```
Cloud Name:    dumg7ln6v
API Key:       915413714192626
Upload Preset: deutsch_lernen_unsigned  ← Cloudinary dashboard-এ বানাতে হবে (Unsigned)
Upload URL:    https://api.cloudinary.com/v1_1/dumg7ln6v/image/upload
Avatar folder: deutsch_lernen/avatars
Audio folder:  deutsch_lernen/audio
```

---

## 🎨 Design System

### Colors (CSS Variables — সব page-এ একই :root)
```css
:root {
  --bg:      #04080f;
  --surface: #080e1a;
  --surface2:#0c1322;
  --surface3:#101828;
  --border:  rgba(255,255,255,.055);
  --gold:    #f5c842;
  --gold2:   #e0a820;
  --teal:    #2dd4bf;
  --rose:    #fb7185;
  --indigo:  #818cf8;
  --emerald: #34d399;
  --orange:  #fb923c;
  --violet:  #a78bfa;
  --sky:     #38bdf8;
  --muted:   #64748b;
  --sub:     #94a3b8;
  --text:    #f0f4f8;
}
```

### Background Pattern (সব page-এ হুবহু একই)
```css
body::before {
  content:''; position:fixed; inset:0; pointer-events:none; z-index:0;
  background:
    radial-gradient(ellipse 80% 60% at 0% 0%,  rgba(245,200,66,.055), transparent 60%),
    radial-gradient(ellipse 60% 50% at 100% 100%, rgba(45,212,191,.045), transparent 55%),
    radial-gradient(ellipse 50% 50% at 50% 50%,  rgba(129,140,248,.025), transparent 60%);
}
body::after {
  content:''; position:fixed; inset:0; pointer-events:none; z-index:0;
  background-image:
    linear-gradient(rgba(255,255,255,.008) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.008) 1px, transparent 1px);
  background-size: 52px 52px;
}
```

### Topbar / Navbar (সব protected page-এ হুবহু একই)
```html
<div class="topbar">
  <div class="logo">
    <div class="logo-icon">🇩🇪</div>
    <div class="logo-text">
      <h1>Deutsch Lernen</h1>
      <p>GERMAN LEARNING PLATFORM · A1 TO C2</p>
    </div>
  </div>
  <div class="topbar-right">
    <nav class="nav-links">
      <a href="roadmap.html"      class="nav-link">Journey</a>
      <a href="quiz-a1-a2.html"   class="nav-link">Quiz</a>
      <a href="grammar.html"      class="nav-link">Grammatik</a>
      <a href="speaking.html"     class="nav-link">Sprechen</a>
      <a href="leaderboard.html"  class="nav-link">Rangliste</a>
      <a href="chat.html"         class="nav-link">Chat</a>
    </nav>
    <div class="user-section">
      <div class="user-avatar" id="nav-avatar" onclick="location.href='profile.html'">👤</div>
      <div class="user-name" id="nav-name">লোড হচ্ছে...</div>
      <button class="btn-logout" id="btn-logout">Logout</button>
    </div>
  </div>
</div>
```

### Buttons
```css
/* Primary (gold) */
background: linear-gradient(135deg, #f5c842, #e0a820);
color: #000; font-weight: 800; border-radius: 13px;

/* Secondary / outline */
border: 1px solid rgba(255,255,255,.1);
background: rgba(255,255,255,.05);
```

### Card Accent Colors
```css
.ca-gold   { background: linear-gradient(90deg, #f5c842, #fbbf24); }
.ca-teal   { background: linear-gradient(90deg, #2dd4bf, #06b6d4); }
.ca-indigo { background: linear-gradient(90deg, #818cf8, #6366f1); }
.ca-rose   { background: linear-gradient(90deg, #fb7185, #f43f5e); }
.ca-emerald{ background: linear-gradient(90deg, #34d399, #10b981); }
.ca-orange { background: linear-gradient(90deg, #fb923c, #f97316); }
.ca-violet { background: linear-gradient(90deg, #a78bfa, #8b5cf6); }
.ca-sky    { background: linear-gradient(90deg, #38bdf8, #0ea5e9); }
```

---

## 📁 File Structure (Dashboard-এর actual links অনুযায়ী)

```
deutsch-lernen/
│
├── index.html            ✅ DONE — Login/Register
├── dashboard.html        ✅ DONE — Main hub
│
├── vokabelquiz.html       ❌ TODO — Vokabelquiz (A1–C2)
├── grammatik.html          ❌ TODO — Grammatik lessons
├── sprechen.html         ❌ TODO — Sprechen / উচ্চারণ
├── hoeren.html        ❌ TODO — Hören / Audio
├── schreiben.html      ❌ TODO — Schreiben / AI check
├── woerterbuch.html  ❌ TODO — Wörterbuch / Flashcards
├── lernreise.html          ❌ TODO — Lernreise A1→C2
├── taegliche-aufgaben.html       ❌ TODO — Tägliche Aufgaben / Daily
├── community-chat.html             ❌ TODO — Community Chat (Live)
├── freunde.html          ❌ TODO — Freunde / Follow system
├── live-kurs.html       ❌ TODO — Live Kurs / Video class
├── nachrichten.html            ❌ TODO — Nachrichten / DM
├── fortschritt.html         ❌ TODO — Fortschritt / Charts
├── rangliste.html      ❌ TODO — Rangliste / Top users
├── mein-profil.html          ❌ TODO — Mein Profil
│
├── admin.html            🔧 ADAPTING — English Shekho থেকে নেওয়া
│
├── js/
│   ├── firebase-config.js  ✅ DONE — shared module (সব page import করে)
│   └── admin.js            ❌ TODO
│
└── css/
    └── admin.css           ❌ TODO
```

### Dashboard Card → File Name Mapping (exact)
| Card Title (German) | href (file name) | বাংলা বিবরণ |
|---|---|---|
| Vokabelquiz | `vokabelquiz.html` | A1–C2 vocabulary MCQ |
| Grammatik | `grammatik.html` | German grammar lessons |
| Sprechen | `sprechen.html` | উচ্চারণ guide + drill |
| Hören | `hoeren.html` | Audio clips (Cloudinary) |
| Schreiben | `schreiben.html` | AI writing feedback |
| Lernreise | `lernreise.html` | A1→C2 structured path |
| Wörterbuch | `woerterbuch.html` | Vocabulary + flashcards |
| Tägliche Aufgaben | `taegliche-aufgaben.html` | Daily challenges |
| Community Chat | `community-chat.html` | Live chat |
| Rangliste | `rangliste.html` | XP-based ranking |
| Freunde | `freunde.html` | Follow / social |
| Live Kurs | `live-kurs.html` | Video class |
| Nachrichten | `nachrichten.html` | Private messages |
| Fortschritt | `fortschritt.html` | Progress charts |
| Mein Profil | `mein-profil.html` | User profile |

### Footer Links (exact)
```
roadmap.html    → Lernreise
grammar.html    → Grammatik
vocab-dashboard.html → Wörterbuch
leaderboard.html → Rangliste
quiz-a1-a2.html → Quiz
speaking.html   → Sprechen
listening.html  → Hören
writing-lab.html → Schreiben
```

---

## 🗄️ Firestore Database Structure

### Collection: `users`
```
users/{uid}
  displayName:     string
  email:           string
  photoURL:        string (Cloudinary URL)
  xp:              number (0+)
  streak:          number (consecutive days)
  sessions:        number (total study sessions)
  totalCorrect:    number (total correct quiz answers)
  masteredWords:   array<string>
  completedTopics: array<string>
  role:            "user" | "admin"
  banned:          boolean
  createdAt:       timestamp
  lastLogin:       timestamp
```

### Collection: `scores`
```
scores/{auto-id}
  uid:       string
  level:     "a1"|"a2"|"b1"|"b2"|"c1"|"c2"
  correct:   number
  total:     number
  pct:       number (0–100)
  createdAt: timestamp
```

### Collection: `grammar_lessons`
```
grammar_lessons/{auto-id}
  title:       string
  category:    string (e.g. "Artikel", "Kasus", "Verben")
  level:       "beginner"|"intermediate"|"advanced"
  icon:        string (emoji)
  explanation: string (বাংলায়)
  formula:     string
  examples:    array<string>
  createdAt:   timestamp
```

### Collection: `vocab_words` (Wörterbuch-এর জন্য)
```
vocab_words/{auto-id}
  german:     string
  bengali:    string
  category:   string (e.g. "Farben", "Essen", "Familie")
  level:      "A1"|"A2"|"B1"|"B2"|"C1"|"C2"
  example:    string (German sentence)
  audioUrl:   string (Cloudinary, optional)
```

### Collection: `community_posts` (chat.html)
```
community_posts/{auto-id}
  uid:       string
  userName:  string
  photoURL:  string
  content:   string
  likes:     number
  createdAt: timestamp
```

---

## ⚡ XP & Level System

```js
const LEVELS = [
  { label:"A1", name:"Anfänger",        min:0,     max:500   },
  { label:"A2", name:"Grundstufe",      min:500,   max:2000  },
  { label:"B1", name:"Mittelstufe",     min:2000,  max:5000  },
  { label:"B2", name:"Oberstufe",       min:5000,  max:10000 },
  { label:"C1", name:"Fortgeschritten", min:10000, max:18000 },
  { label:"C2", name:"Meisterschaft",   min:18000, max:30000 },
];
```

**XP Rewards:**
| Action | XP |
|--------|----|
| Quiz প্রতি সঠিক উত্তর | +10 |
| Quiz 100% score bonus | +50 |
| Grammar lesson সম্পন্ন | +20 |
| Writing lab submit | +30 |
| Daily challenge | +25 |
| Vocab word mastered | +5 |
| Community post | +5 |
| Daily streak | +15 |

---

## 📄 Page Spec (সংক্ষেপ)

### ✅ index.html
Email + Google login/register, Cloudinary photo upload, password strength, forgot password, বাংলায় error messages.

### ✅ dashboard.html
Sticky topbar, hero (XP/streak/level), daily challenge, stats row, A1→C2 progress bar, 15 feature cards, recent quiz scores, footer.

### ❌ vokabelquiz.html — **পরের কাজ (Priority 1)**
- Level selector: A1, A2, B1, B2, C1, C2
- MCQ (4 options), timer optional
- Score → `scores` collection, XP → `users.xp`
- Question types: Artikel (der/die/das), German→Bengali vocab, sentence fill-in, grammar

### ❌ grammatik.html — Priority 2
- Topic cards (Artikel, Kasus, Verben, Adjektiv, Präposition...)
- Level filter, modal with explanation (বাংলায়), formula, examples
- Firestore `grammar_lessons` থেকে load
- XP on completion

### ❌ woerterbuch.html — Priority 3
- Category browse (Farben, Essen, Familie, Zahlen...)
- Flashcard mode (flip animation)
- Level filter
- Firestore `vocab_words` থেকে load

### ❌ lernreise.html — Priority 4
- Visual A1→C2 timeline
- প্রতি level-এ topics list
- Completed checkmarks (user data)
- Click → relevant page

### ❌ rangliste.html — Priority 5
- Top 20 by XP (Firestore query)
- Avatar, name, XP, level badge, streak
- Current user highlighted
- Weekly / All-time toggle

### ❌ taegliche-aufgaben.html — Priority 6
- Daily 7 challenges (day-based, same as dashboard)
- Completion tracking
- XP reward

### ❌ fortschritt.html — Priority 7
- Score history bar chart
- Streak calendar heatmap
- Level timeline

### ❌ mein-profil.html — Priority 8
- Avatar + name + email
- Photo re-upload (Cloudinary)
- Stats, mastered words, quiz history

### ❌ schreiben.html — Priority 9
- German text input → Claude API
- Feedback বাংলায় (errors, correction, explanation)
- Level selector

**Claude prompt:**
```
তুমি একজন German language teacher। User বাংলাভাষী, German শিখছে।
Level: {level}
লেখা: "{text}"
বাংলায় feedback দাও: ভুল, সঠিক version, ব্যাখ্যা, উৎসাহ।
```

### ❌ community-chat.html — Priority 10
- Firestore real-time posts
- Like, post German sentences
- XP for posting

### ❌ sprechen.html — Priority 11
- উচ্চারণ guide (IPA বা audio)
- Drill exercises

### ❌ hoeren.html — Priority 12
- Cloudinary audio clips
- Transcript toggle, level filter

### ❌ freunde.html — Priority 13
- Follow/unfollow users
- Friends' XP & streak

### ❌ live-kurs.html — Priority 14
- Future feature (video/screenshare)

### ❌ nachrichten.html — Priority 15
- Private DM (Firestore)

### 🔧 admin.html — যেকোনো সময়
English Shekho থেকে adapt: title, logo, content types German-specific করো।

---

## 🔐 Admin Access

Firestore-এ manually set করতে হবে:
```
users/{uid} → role: "admin"
```

---

## 🚀 Deploy (Firebase Hosting)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # public dir: .  |  SPA: No
firebase deploy
```

---

## 📝 নতুন Claude Session-এ কীভাবে ব্যবহার করবে

এই file attach করে বলো:
> "আমি Deutsch Lernen project-এ কাজ করছি। এই file-এ সব details আছে।
> আজকে `vokabelquiz.html` বানাতে চাই। Dashboard-এর একই design follow করো।"

---

## ✅ Checklist

- [x] Firebase project setup
- [x] Cloudinary account setup
- [x] `js/firebase-config.js`
- [x] `index.html`
- [x] `dashboard.html`
- [ ] `vokabelquiz.html`
- [ ] `grammatik.html`
- [ ] `woerterbuch.html`
- [ ] `lernreise.html`
- [ ] `rangliste.html`
- [ ] `taegliche-aufgaben.html`
- [ ] `fortschritt.html`
- [ ] `mein-profil.html`
- [ ] `schreiben.html`
- [ ] `community-chat.html`
- [ ] `sprechen.html`
- [ ] `hoeren.html`
- [ ] `freunde.html`
- [ ] `live-kurs.html`
- [ ] `nachrichten.html`
- [ ] `admin.html` adapt + `js/admin.js` + `css/admin.css`
- [ ] Firebase Hosting deploy

## ⚠️ Known Issues

1. Cloudinary `deutsch_lernen_unsigned` preset বানাতে হবে
2. Firestore Security Rules production-এ set করতে হবে
3. Streak logic (daily login check) এখনো implement হয়নি
4. admin.html-এ role check এখনো নেই
