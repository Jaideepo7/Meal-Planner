
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfl4BhvloujiQIxvyMqFYAd0vN9LZpWkI",
  authDomain: "meal-planner-99296094-643bf.firebaseapp.com",
  projectId: "meal-planner-99296094-643bf",
  storageBucket: "meal-planner-99296094-643bf.firebasestorage.app",
  messagingSenderId: "728611621393",
  appId: "1:728611621393:web:f1b20e978658e4d7027fb0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
