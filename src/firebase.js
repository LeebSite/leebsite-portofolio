// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
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
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

// Firestore
export const db = getFirestore(app);
