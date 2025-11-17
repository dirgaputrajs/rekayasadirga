// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC7P6PhxWBKbzHQNiH3hdygTv-vbAGIu4I",
  authDomain: "dataterbarudirga.firebaseapp.com",
  databaseURL: "https://data-pass-20681-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dataterbarudirga",
  storageBucket: "dataterbarudirga.firebasestorage.app",
  messagingSenderId: "236647355440",
  appId: "1:236647355440:web:2da3403da62a695aa8c9f5",
  measurementId: "G-87C4LBC4W0"
};


// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
