// ===============================
// js/status.js (versi ringkas dan efisien)
// ===============================
import { db } from "./firebase-config.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const notif = document.getElementById("notif");
const saveBtn = document.getElementById("saveBtn");
const kotaList = ["bank bca", "bank bri", "bank bni", "mandiri", "danamon", "bank bsi"];

// ===============================
// AMBIL & TAMPILKAN STATUS
// ===============================
async function loadStatus() {
  try {
    const snapshot = await get(ref(db, "statusKota"));
    if (!snapshot.exists()) return;

    const data = snapshot.val();
    kotaList.forEach((kota) => {
      const select = document.getElementById(kota);
      if (select) {
        select.value = data[kota] || "offline";
        updateColor(select);
      }
    });

    // notif.textContent = "✅ Status berhasil dimuat."; ← dihapus
  } catch (err) {
    // notif.textContent = "❌ Gagal memuat data!"; ← dihapus
    console.error(err);
  }
}


loadStatus();

// ===============================
// SIMPAN STATUS KE FIREBASE
// ===============================
saveBtn.addEventListener("click", async () => {
  const updates = {};
  kotaList.forEach((kota) => {
    updates[kota] = document.getElementById(kota).value;
  });

  try {
    await set(ref(db, "statusKota"), updates);
    notif.textContent = "✅ Status berhasil diperbarui!";
  } catch (err) {
    notif.textContent = "❌ Gagal menyimpan status!";
    console.error(err);
  }
});

// ===============================
// UBAH WARNA OTOMATIS ONLINE/OFFLINE
// ===============================
function updateColor(select) {
  const isOnline = select.value === "online";
  select.style.backgroundColor = isOnline ? "#c6f6c6" : "#f8d7da";
  select.style.color = isOnline ? "#006400" : "#721c24";
  select.style.borderColor = isOnline ? "#28a745" : "#dc3545";
  select.style.fontWeight = "bold";
}

// Jalankan pewarnaan awal dan pantau perubahan
document.querySelectorAll("select").forEach((select) => {
  updateColor(select);
  select.addEventListener("change", () => updateColor(select));
});
