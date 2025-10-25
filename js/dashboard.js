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
document.getElementById("user-name").textContent = `Selamat datang, ${username}!`;

// ===============================
// LOGOUT
// ===============================
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  alert("Anda telah logout!");
  window.location.href = "index.html";
});

// ===============================
// JAM REAL-TIME
// ===============================
function displayClock() {
  const clockDisplay = document.getElementById("clock-display");
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

