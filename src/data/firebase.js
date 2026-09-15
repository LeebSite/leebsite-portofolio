// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCr1WqplxPLVvQk9Fpk_XEDiTp0hkjpPnw",
  authDomain: "leeb-portofolio.firebaseapp.com",
  projectId: "leeb-portofolio",
  storageBucket: "leeb-portofolio.firebasestorage.app",
  messagingSenderId: "250168438321",
  appId: "1:250168438321:web:c3f31e8c9071137c8def10",
  measurementId: "G-S5BNEDJ9WS"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Use redirect on mobile/production to avoid COOP issues, popup on desktop dev
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
export const loginWithGoogle = () =>
  isMobile ? signInWithRedirect(auth, provider) : signInWithPopup(auth, provider);
export { getRedirectResult };
export const logout = () => signOut(auth);

// Firestore
export const db = getFirestore(app);
