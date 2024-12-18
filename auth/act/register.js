import { auth } from '../firebase/config.js';
import { createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            sendEmailVerification(userCredential.user)
                .then(() => {
                    alert("Registrasi berhasil! Email verifikasi telah dikirim. Silakan cek kotak masuk Anda sebelum login.");
                    window.location.href = "../../index.html";
                })
                .catch((error) => {
                    console.error("Gagal mengirim email verifikasi:", error);
                    alert("Registrasi berhasil, tetapi email verifikasi gagal dikirim. Silakan coba lagi.");
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            switch (errorCode) {
                case "auth/email-already-in-use":
                    alert("Email sudah terdaftar. Silakan gunakan email lain.");
                    break;
                case "auth/weak-password":
                    alert("Password terlalu lemah. Minimal 6 karakter.");
                    break;
                case "auth/invalid-email":
                    alert("Format email tidak valid.");
                    break;
                default:
                    alert(`Terjadi kesalahan: ${error.message}`);
            }
        });
});

