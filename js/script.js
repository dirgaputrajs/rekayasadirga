// =========================
// IMPORT FIREBASE
// =========================
import { db } from "./firebase-config.js";
import { ref, get, child } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// =========================
// JAM REAL-TIME
// =========================
function displayClock() {
  const clockDisplay = document.getElementById("clock-display");
  if (clockDisplay) {
    const now = new Date();
    const timeString = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    clockDisplay.textContent = timeString;
  }
}
setInterval(displayClock, 1000);
displayClock();

// =========================
// LOGIN
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const status = document.getElementById("status");

  // Pastikan hanya jalan di halaman index (login)
  if (!loginForm) return;

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userId = document.getElementById("userId").value.trim();
    const password = document.getElementById("password").value.trim();

    status.textContent = "Memeriksa akun...";

    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, `users/${userId}`));

      if (!snapshot.exists()) {
        status.textContent = "❌ User tidak ditemukan!";
        return;
      }

      const userData = snapshot.val();

      if (userData.password === password) {
        status.textContent = "✅ Login berhasil! Mengalihkan...";
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", userId);

        // Delay sedikit biar user sempat lihat status
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 800);
      } else {
        status.textContent = "❌ ID atau Password salah!";
      }
    } catch (err) {
      console.error(err);
      status.textContent = "⚠️ Gagal login: " + err.message;
    }
  });
});

// =========================
// LOGOUT
// =========================
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  window.location.href = "index.html";
}
window.logout = logout;
