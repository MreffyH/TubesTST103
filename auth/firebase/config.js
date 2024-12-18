import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFMKMutLMdC-DsY8vN2AfoMGscrH2Vbh4",
    authDomain: "greengrow-tst.firebaseapp.com",
    projectId: "greengrow-tst",
    storageBucket: "greengrow-tst.firebasestorage.app",
    messagingSenderId: "1017331343595",
    appId: "1:1017331343595:web:a4aaa6b8a346e8bcfedeae",
    databaseURL: "https://greengrow-tst-default-rtdb.firebaseio.com"
};

// Initialize Firebase
if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export const auth = getAuth();