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

// Ambil nama user dari localStorage
const userNameDisplay = document.getElementById("userNameDisplay");
const logoutBtn = document.getElementById("logoutBtn");
const btnIn = document.getElementById("btnIn");
const btnOut = document.getElementById("btnOut");
const notif = document.getElementById("notif");
const reasonSelect = document.getElementById("reasonSelect");

// ===============================
// DURASI DI LUAR
// ===============================
const durationDisplay = document.getElementById("durationDisplay");

let keluarTime = null;
let durasiInterval = null;

// Saat klik tombol KELUAR
btnOut.addEventListener("click", () => {
  const reason = reasonSelect.value;
  if (!reason) return (notif.textContent = "⚠️ Pilih alasan keluar terlebih dahulu!");

  const time = new Date();
  localStorage.setItem("keluarTime", time); // simpan waktu keluar

  notif.textContent = `🚶‍♂️ ${loggedUser} keluar (${reason}) pada ${time.toLocaleTimeString()}`;
  startDurationTimer();
});

// Saat klik tombol MASUK
btnIn.addEventListener("click", () => {
  clearInterval(durasiInterval);
  localStorage.removeItem("keluarTime");
  durationDisplay.textContent = "";
  const time = new Date().toLocaleTimeString();
  notif.textContent = `✅ ${loggedUser} masuk pada ${time}`;
});

function startDurationTimer() {
  clearInterval(durasiInterval);
  durasiInterval = setInterval(() => {
    const savedTime = localStorage.getItem("keluarTime");
    if (!savedTime) return;
    const diffMs = new Date() - new Date(savedTime);

    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);

    durationDisplay.textContent = `🕒 Sudah di luar selama ${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
}

// Jika sebelumnya sudah keluar (misal refresh halaman)
if (localStorage.getItem("keluarTime")) {
  startDurationTimer();
}





// Tampilkan nama user
const loggedUser = localStorage.getItem("loggedUser"); // diset waktu login
if (loggedUser) {
  userNameDisplay.textContent = `👤 ${loggedUser}`;
} else {
  userNameDisplay.textContent = "👤 Belum Login";
}

// Tombol Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  window.location.href = "absensi.html";
});

// Tombol Masuk
btnIn.addEventListener("click", () => {
  const time = new Date().toLocaleTimeString();
  notif.textContent = `✅ ${loggedUser} masuk pada ${time}`;
});

// Tombol Keluar
btnOut.addEventListener("click", () => {
  const reason = reasonSelect.value;
  if (!reason) return (notif.textContent = "⚠️ Pilih alasan keluar terlebih dahulu!");
  const time = new Date().toLocaleTimeString();
  notif.textContent = `🚶‍♂️ ${loggedUser} keluar (${reason}) pada ${time}`;
});
