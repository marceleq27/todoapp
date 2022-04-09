import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyB8BE_RuoyOJR--LgOUz0O-5yQc26PGB4U",
  authDomain: "todoapp-6414b.firebaseapp.com",
  databaseURL: "https://todoapp-6414b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todoapp-6414b",
  storageBucket: "todoapp-6414b.appspot.com",
  messagingSenderId: "195300439942",
  appId: "1:195300439942:web:83de9d831fd78a4b799e07",
  measurementId: "G-PYGTYYLQL4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
