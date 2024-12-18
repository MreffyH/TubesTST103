import { auth } from '../firebase/config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const loggedOutState = document.getElementById('logged-out-state');
const loggedInState = document.getElementById('logged-in-state');

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User ID:", user.uid);
        console.log("User Email:", user.email);
        console.log("User Display Name:", user.displayName);
        loggedOutState.classList.add('hidden');
        loggedInState.classList.remove('hidden');
    } else {
        console.log("No user is signed in.");
        loggedOutState.classList.remove('hidden');
        loggedInState.classList.add('hidden');
    }
});

