// ===============================
// JAM REALTIME
// ===============================
function displayClock() {
  const clockDisplay = document.getElementById("clock-display");
  if (!clockDisplay) return;
  setInterval(() => {
    const now = new Date();
    clockDisplay.textContent = now.toLocaleTimeString("id-ID", { hour12: false });
  }, 1000);
}
displayClock();

// ===============================
// LOGIN VALIDASI (Firebase)
// ===============================
import { db } from "./firebase-config.js";
import { get, ref } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      loginMessage.textContent = "⚠️ Harap isi ID dan Password!";
      loginMessage.style.color = "orange";
      return;
    }

    try {
      const snapshot = await get(ref(db, "users/" + username));
      if (!snapshot.exists()) {
        loginMessage.textContent = "❌ User tidak ditemukan!";
        loginMessage.style.color = "red";
        return;
      }

      const data = snapshot.val();
      if (data.password === password) {
        loginMessage.textContent = "✅ Login berhasil!";
        loginMessage.style.color = "green";

        // Simpan user ke localStorage
        localStorage.setItem("loggedUser", username);

        // Arahkan ke halaman rekap_inout
        setTimeout(() => {
          window.location.href = "rekap_inout.html";
        }, 1000);
      } else {
        loginMessage.textContent = "❌ Password salah!";
        loginMessage.style.color = "red";
      }
    } catch (err) {
      console.error(err);
      loginMessage.textContent = "⚠️ Gagal terhubung ke Firebase!";
      loginMessage.style.color = "red";
    }
  });
}
