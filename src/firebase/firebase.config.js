import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZ9B4aZZVrgUylUrwhvPS4iOa5NLEozOc",

  authDomain: "contesthub-d358c.firebaseapp.com",

  projectId: "contesthub-d358c",

  storageBucket: "contesthub-d358c.firebasestorage.app",

  messagingSenderId: "688800622081",

  appId: "1:688800622081:web:8cee665b1e5f0bca61c200",

  measurementId: "G-E87X1R3NFN"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);