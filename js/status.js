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

      // ⏳ Hilangkan notifikasi setelah 3 detik
  setTimeout(() => {
    notif.textContent = "";
  }, 2000);

  } catch (err) {
    notif.textContent = "❌ Gagal menyimpan status!";
    console.error(err);
      // Hilangkan pesan error juga setelah 3 detik
  setTimeout(() => {
    notif.textContent = "";
  }, 3000);
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


// ===============================
// TAMBAHAN: STATUS E-MONEY
// ===============================
const notifEmoney = document.getElementById("notifEmoney");
const saveEmoneyBtn = document.getElementById("saveEmoneyBtn");
const emoneyList = ["dana", "ovo", "gopay", "shopeepay", "linkaja"];

// Ambil & tampilkan status E-Money
async function loadStatusEmoney() {
  try {
    const snapshot = await get(ref(db, "statusEmoney"));
    if (!snapshot.exists()) return;

    const data = snapshot.val();
    emoneyList.forEach((item) => {
      const select = document.getElementById(item);
      if (select) {
        select.value = data[item] || "offline";
        updateColor(select);
      }
    });
  } catch (err) {
    console.error("Gagal memuat status E-Money:", err);
  }
}
loadStatusEmoney();

// Simpan status E-Money ke Firebase
saveEmoneyBtn.addEventListener("click", async () => {
  const updates = {};
  emoneyList.forEach((item) => {
    updates[item] = document.getElementById(item).value;
  });

  try {
    await set(ref(db, "statusEmoney"), updates);
    notifEmoney.textContent = "✅ Status E-Money berhasil diperbarui!";
 
    setTimeout(() => {
    notifEmoney.textContent = "";
  }, 2000);

    
  } catch (err) {
    notifEmoney.textContent = "❌ Gagal menyimpan status E-Money!";
    console.error(err);

      setTimeout(() => {
    notifEmoney.textContent = "";
  }, 2000);

  }
});
// ===============================
// POPUP TAMBAH USER + SIMPAN KE FIREBASE
// ===============================
import { push } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

window.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popupAddUser");
  const openBtn = document.getElementById("openPopupBtn");
  const closeBtn = document.getElementById("closePopupBtn");
  const saveUserBtn = document.getElementById("saveUserBtn");
  const inputUsername = document.getElementById("newUsername");
  const inputPassword = document.getElementById("newPassword");

  if (!popup || !openBtn || !closeBtn || !saveUserBtn) return;

  // --- Buka & tutup popup
  openBtn.addEventListener("click", () => {
    popup.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });

  // --- Simpan user ke Firebase
  saveUserBtn.addEventListener("click", async () => {
  const username = inputUsername.value.trim();
  const password = inputPassword.value.trim();

  if (!username || !password) {
    alert("⚠️ Nama dan password wajib diisi!");
    return;
  }

  try {
    const userRef = ref(db, "users/" + username);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      // Jika user sudah ada
      alert("⚠️ Username sudah digunakan! Pilih nama lain.");
      return;
    }

    // Jika belum ada, buat user baru
    await set(userRef, {
      password: password,
    });

    alert("✅ User baru berhasil ditambahkan!");
    popup.style.display = "none";
    inputUsername.value = "";
    inputPassword.value = "";
  } catch (err) {
    console.error("❌ Gagal menambah user:", err);
    alert("❌ Gagal menambah user. Coba periksa koneksi atau izin Firebase.");
  }
  });
});


// ===============================
// TAMPILKAN DAFTAR USER DARI FIREBASE
// ===============================
const showUsersBtn = document.getElementById("showUsersBtn");

if (showUsersBtn) {
  showUsersBtn.addEventListener("click", async () => {
    try {
      const snapshot = await get(ref(db, "users"));
      if (!snapshot.exists()) {
        alert("⚠️ Belum ada user yang tersimpan.");
        return;
      }

      const users = snapshot.val();
      let daftarUser = "👥 Daftar User:\n\n";
      Object.keys(users).forEach((username, i) => {
        daftarUser += `${i + 1}. ${username}\n`;
      });

      alert(daftarUser);
    } catch (err) {
      console.error("❌ Gagal menampilkan user:", err);
      alert("❌ Gagal memuat daftar user. Periksa koneksi Firebase.");
    }
  });
}

// ===============================
// HAPUS USER DENGAN KETIK USERNAME
// ===============================
import { remove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const deleteUserBtn = document.getElementById("deleteUserBtn");

if (deleteUserBtn) {
  deleteUserBtn.addEventListener("click", async () => {
    const username = prompt("🗑️ Masukkan nama user yang ingin dihapus:");

    if (!username) {
      alert("⚠️ Nama user tidak boleh kosong!");
      return;
    }

    const konfirmasi = confirm(`Yakin ingin menghapus user "${username}"?`);
    if (!konfirmasi) return;

    try {
      await remove(ref(db, "users/" + username));
      alert(`✅ User "${username}" berhasil dihapus.`);
    } catch (err) {
      console.error("❌ Gagal menghapus user:", err);
      alert("❌ Terjadi kesalahan saat menghapus user. Periksa koneksi Firebase.");
    }
  });
}

// ===============================
// TOMBOL ABSENSI → PINDAH HALAMAN
// ===============================
const absenBtn = document.getElementById("absen");

if (absenBtn) {
  absenBtn.addEventListener("click", () => {
    window.location.href = "absensi.html"; // ganti dengan nama file tujuan
  });
}
