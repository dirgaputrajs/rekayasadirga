// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCmojk02qTJcueMxEaDAoaiD25INJaDq4s",
  authDomain: "data-dirga.firebaseapp.com",
  databaseURL: "https://data-pass-20681-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "data-dirga",
  storageBucket: "data-dirga.appspot.com",
  messagingSenderId: "223486198559",
  appId: "1:223486198559:web:09f37d1db3b3030895262a",
  measurementId: "G-JQ429SMJC8"
};


// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
