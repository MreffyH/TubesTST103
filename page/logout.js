import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFMKMutLMdC-DsY8vN2AfoMGscrH2Vbh4",
    authDomain: "greengrow-tst.firebaseapp.com",
    projectId: "greengrow-tst",
    storageBucket: "greengrow-tst.firebasestorage.app",
    messagingSenderId: "1017331343595",
    appId: "1:1017331343595:web:a4aaa6b8a346e8bcfedeae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Tombol logout
const confirmLogoutButton = document.getElementById("confirm-logout");
const cancelLogoutButton = document.getElementById("cancel-logout");

// Event handler untuk Logout
confirmLogoutButton.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            console.log("User successfully logged out.");
            alert("Anda telah keluar dari akun.");
            window.location.href = "login.html"; // Arahkan ke halaman login
        })
        .catch((error) => {
            console.error("Error logging out:", error);
            alert("Terjadi kesalahan saat logout. Silakan coba lagi.");
        });
});

// Event handler untuk Batal
cancelLogoutButton.addEventListener("click", () => {
    window.history.back(); // Kembali ke halaman sebelumnya
});
