// =========================
// IMPORT FIREBASE
// =========================
import { db } from "./firebase-config.js";
import { ref, get, child } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

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
  const status = document.getElementById("status");
  
  


  if (!loginForm) return; // kalau bukan di halaman login, lewati

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
        status.textContent = "✅ Login berhasil!";
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", userId);
        window.location.href = "dashboard.html";
      } else {
        status.textContent = "❌ Id & Password salah!";
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
  window.location.href = "index.html";
}
window.logout = logout; // biar bisa dipanggil dari HTML
