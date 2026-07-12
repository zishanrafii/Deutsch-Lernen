// ═══════════════════════════════════════════════════════
//  Deutsch Lernen — Firebase Config (Shared Module)
//  js/firebase-config.js
//  Import this file in every page that needs Firebase.
// ═══════════════════════════════════════════════════════

import { initializeApp }            from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics }             from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  initializeFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
  serverTimestamp,
  increment,
  arrayUnion,
}from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ── Firebase project config ──────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyBBJn489Bch5U-AYOvHTcFKyIZRre8zlaE",
  authDomain:        "deutsch-lernen-bd.firebaseapp.com",
  projectId:         "deutsch-lernen-bd",
  storageBucket:     "deutsch-lernen-bd.firebasestorage.app",
  messagingSenderId: "310285600287",
  appId:             "1:310285600287:web:0449acabb9decbdcc5b72a",
  measurementId:     "G-8MCPPJB6JS",
};

// ── Init ─────────────────────────────────────────────
const app       = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth      = getAuth(app);
const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});
const googleProvider = new GoogleAuthProvider();

// ── Helper: redirect to login if not authenticated ───
// Also self-heals: if the Firebase Auth account exists but the
// Firestore users/{uid} document is somehow missing (e.g. registration
// page closed early, a network blip, Cloudinary upload failing before
// the doc-create step, etc.), this creates it automatically the next
// time the user lands on any page that calls requireAuth(). This
// mirrors the auto-create fallback used on the English Shekho project.
function requireAuth(callback) {
  onAuthStateChanged(auth, async user => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      let userData = {};
      if (!snap.exists()) {
        // Doc missing -- create it now with safe defaults
        // (must match firestore.rules create-rule defaults exactly).
        userData = {
          displayName: user.displayName || "Lerner",
          email:       user.email || "",
          photoURL:    user.photoURL || "",
          xp:          0,
          role:        "user",
          plan:        "free",
          banned:      false,
          createdAt:   serverTimestamp(),
        };
        await setDoc(userRef, userData);
      } else {
        // Doc exists -- just bump lastLogin, ignore if it fails.
        userData = snap.data();
        updateDoc(userRef, { lastLogin: serverTimestamp() }).catch(() => {});
      }

      // Keep a minimal PUBLIC mirror of this profile in sync.
      // Used by freunde.html (browse/add friends) and rangliste.html
      // (leaderboard) so they never need to read another user's full
      // /users/{uid} document (which firestore.rules correctly forbids).
      // Only non-sensitive fields live here: no email, plan, role, banned.
      setDoc(doc(db, "publicProfiles", user.uid), {
        displayName: userData.displayName || user.displayName || "Lerner",
        photoURL:    userData.photoURL    || user.photoURL    || "",
        xp:          userData.xp || 0,
        createdAt:   userData.createdAt   || serverTimestamp(),
      }).catch(() => {});
    } catch (e) {
      // Don't block the page load if this sync fails -- just log it.
      console.warn("User doc sync failed:", e);
    }

    callback(user);
  });
}

// ── Helper: redirect to dashboard if already logged in
function redirectIfLoggedIn() {
  onAuthStateChanged(auth, user => {
    if (user) window.location.href = "dashboard.html";
  });
}

// ── Cloudinary config (read-only upload preset) ──────
const CLOUDINARY = {
  cloudName:    "dumg7ln6v",
  apiKey:       "915413714192626",
  uploadPreset: "deutsch_lernen_unsigned", // create an unsigned preset in Cloudinary dashboard
  uploadUrl:    "https://api.cloudinary.com/v1_1/dumg7ln6v/image/upload",
  // Cloudinary treats video AND audio (voice messages) under "video" resource_type.
  videoUploadUrl: "https://api.cloudinary.com/v1_1/dumg7ln6v/video/upload",
  // Any other file (pdf, docs, zip, etc.) goes under "raw".
  rawUploadUrl:   "https://api.cloudinary.com/v1_1/dumg7ln6v/raw/upload",
};

// ── Helper: upload any file (image/video/audio/raw) to Cloudinary ───
// Used by chat.html for sending photos, videos, voice messages, and
// generic file attachments. Picks the right Cloudinary endpoint based
// on the file's MIME type. Returns { url, resourceType, bytes, format }.
async function uploadChatAttachment(file) {
  let endpoint = CLOUDINARY.rawUploadUrl;
  let resourceType = "raw";

  if (file.type.startsWith("image/")) {
    endpoint = CLOUDINARY.uploadUrl;
    resourceType = "image";
  } else if (file.type.startsWith("video/") || file.type.startsWith("audio/")) {
    endpoint = CLOUDINARY.videoUploadUrl;
    resourceType = file.type.startsWith("audio/") ? "audio" : "video";
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY.uploadPreset);

  const res = await fetch(endpoint, { method: "POST", body: formData });
  if (!res.ok) throw new Error("Cloudinary upload failed: " + res.status);
  const data = await res.json();

  return {
    url:          data.secure_url,
    resourceType, // "image" | "video" | "audio" | "raw"
    bytes:        data.bytes,
    format:       data.format,
    duration:     data.duration || null, // video/audio length in seconds
  };
}

// ── Export everything pages need ─────────────────────
export {
  app, analytics, auth, db, googleProvider, CLOUDINARY,

  // Auth functions
  onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signInWithPopup,
  signOut, updateProfile, sendPasswordResetEmail,
  sendEmailVerification,
  EmailAuthProvider, reauthenticateWithCredential, updatePassword,

  // Firestore functions
  doc, getDoc, setDoc, updateDoc, addDoc, deleteDoc,
  collection, query, where, orderBy, limit, getDocs, onSnapshot,
  serverTimestamp, increment, arrayUnion,

  // Helpers
  requireAuth, redirectIfLoggedIn, uploadChatAttachment,
};
