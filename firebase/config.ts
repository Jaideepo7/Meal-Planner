
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkaJ8vF7c7ubYaBGT8IEz4Hdi1foglUQU",
  authDomain: "meal-pla-4b01f.firebaseapp.com",
  projectId: "meal-pla-4b01f",
  storageBucket: "meal-pla-4b01f.firebasestorage.app",
  messagingSenderId: "232966009287",
  appId: "1:232966009287:web:b70b8a09a7211d893e69e2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
