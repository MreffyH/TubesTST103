import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFMKMutLMdC-DsY8vN2AfoMGscrH2Vbh4",
    authDomain: "greengrow-tst.firebaseapp.com",
    projectId: "greengrow-tst",
    storageBucket: "greengrow-tst.firebasestorage.app",
    messagingSenderId: "1017331343595",
    appId: "1:1017331343595:web:a4aaa6b8a346e8bcfedeae",
};

// Initialize Firebase
if (!getApps().length) {
    initializeApp(firebaseConfig);
}
const auth = getAuth();


document.addEventListener("DOMContentLoaded", () => {
    const profileLink = document.querySelector('.profile-link');

    if (!profileLink) {
        console.error("Element '.profile-link' tidak ditemukan.");
        return;
    }

    // Cek status login user
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Jika user login, arahkan ke halaman logout
            profileLink.setAttribute('href', 'page/logout.html');
        } else {
            // Jika user tidak login, arahkan ke halaman login
            profileLink.setAttribute('href', 'page/login.html');
        }
    });
});