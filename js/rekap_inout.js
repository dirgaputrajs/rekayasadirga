// Ambil nama user dari localStorage
const userNameDisplay = document.getElementById("userNameDisplay");
const logoutBtn = document.getElementById("logoutBtn");
const btnIn = document.getElementById("btnIn");
const btnOut = document.getElementById("btnOut");
const notif = document.getElementById("notif");
const reasonSelect = document.getElementById("reasonSelect");

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
