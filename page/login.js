import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// submit button
const submit = document.getElementById("submit");
submit.addEventListener("click", function(event) {
    event.preventDefault();
    // inputs
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // alert("You signed in");
        window.location.href = "../index.html";
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
    // ..
    });
});