// login/js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAT1xJf9lABB5Dp6UZKHyELSSXbYH4i8pQ",
  authDomain: "data-pass-20681.firebaseapp.com",
  databaseURL: "https://data-pass-20681-default-rtdb.asia-southeast1.firebasedatabase.app", // ✅ gunakan URL dengan region asia-southeast1
  projectId: "data-pass-20681",
  storageBucket: "data-pass-20681.firebasestorage.app",
  messagingSenderId: "257542825371",
  appId: "1:257542825371:web:5f3e05798c6c77c315ed3e"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Database dengan URL region yang benar
const db = getDatabase(app, "https://data-pass-20681-default-rtdb.asia-southeast1.firebasedatabase.app");

// Ekspor supaya bisa diimpor di script.js
export { db };
