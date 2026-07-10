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
  serverTimestamp,
  increment,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
function requireAuth(callback) {
  onAuthStateChanged(auth, user => {
    if (!user) {
      window.location.href = "index.html";
    } else {
      callback(user);
    }
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
};

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
  collection, query, where, orderBy, limit, getDocs,
  serverTimestamp, increment, arrayUnion,

  // Helpers
  requireAuth, redirectIfLoggedIn,
};
