// src/data/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut
} from "firebase/auth";
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
provider.setCustomParameters({ prompt: "select_account" });

// Flexible login with popup + auto fallback to redirect if popup closes/blocks
export const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.warn("Popup login failed or closed, switching to redirect...", error);
    if (error.code === "auth/unauthorized-domain") {
      alert("Domain ini belum diizinkan di Firebase Console. Tambahkan domain ini di Firebase Console -> Authentication -> Settings -> Authorized Domains.");
      return;
    }
    if (error.code === "auth/operation-not-allowed") {
      alert("Metode Login Google belum diaktifkan di Firebase Console. Aktifkan Google Sign-in di Firebase Console -> Authentication -> Sign-in method.");
      return;
    }
    // Switch to redirect mode for popup blocked/closed/COOP issues
    try {
      await signInWithRedirect(auth, provider);
    } catch (redirectErr) {
      console.error("Redirect login error:", redirectErr);
      alert(`Gagal Login Google: ${redirectErr.message}`);
    }
  }
};

export { getRedirectResult };
export const logout = () => signOut(auth);

// Firestore
export const db = getFirestore(app);
