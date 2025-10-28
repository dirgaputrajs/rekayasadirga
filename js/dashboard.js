// ===============================
// CEK LOGIN
// ===============================
const isLoggedIn = localStorage.getItem("isLoggedIn");
const username = localStorage.getItem("username");

if (isLoggedIn !== "true" || !username) {
  alert("Silakan login terlebih dahulu!");
  window.location.href = "index.html";
}

// ===============================
// TAMPILKAN USERNAME
// ===============================
const userNameEl = document.getElementById("user-name");
if (userNameEl) {
  userNameEl.textContent = `Selamat datang, ${username}!`;
}

// ===============================
// LOGOUT
// ===============================
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    alert("Anda telah logout!");
    window.location.href = "index.html";
  });
}

// ===============================
// JAM REAL-TIME
// ===============================
function displayClock() {
  const clockDisplay = document.getElementById("clock-display");
  if (!clockDisplay) return;

  const now = new Date();
  const timeString = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  clockDisplay.textContent = timeString;
}

setInterval(displayClock, 1000);
displayClock();

// ===============================
// CEGAH TOMBOL "BACK"
// ===============================
window.history.pushState(null, "", window.location.href);
window.onpopstate = function () {
  window.history.pushState(null, "", window.location.href);
};

// ===============================
// FIREBASE STATUS BANK & E-MONEY
// ===============================

import { db } from "../js/firebase-config.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// --- STATUS BANK ---
const bankRef = ref(db, "statusKota");
onValue(bankRef, (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  const bankList = [
    "bank bca",
    "bank bri",
    "bank bni",
    "mandiri",
    "danamon",
    "bank bsi"
  ];

  bankList.forEach((id) => {
    const value = data[id] || "offline";
    setStatus(id, value === "online");
  });
});

// --- STATUS E-MONEY ---
const emoneyRef = ref(db, "statusEmoney");
onValue(emoneyRef, (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  const emoneyList = [
    "dana",
    "ovo",
    "gopay",
    "shopeepay",
    "linkaja"
  ];

  emoneyList.forEach((id) => {
    const value = data[id] || "offline";
    setStatus(id, value === "online");
  });
});

// ===============================
// Fungsi update tampilan status
// ===============================
function setStatus(id, online) {
  const itemEl = document.getElementById(id);
  if (!itemEl) return;

  const bar = itemEl.querySelector(".status-bar");
  if (!bar) return;

  bar.className = "status-bar " + (online ? "online" : "offline");
}
