import { auth } from '../../auth/firebase/config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', function() {
    const loggedOutState = document.getElementById('logged-out-state');
    const loggedInState = document.getElementById('logged-in-state');
    const userEmailElement = document.getElementById('.user-email');
    const logoutButton = document.getElementById('logout-button');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            loggedOutState.classList.add('hidden');
            loggedInState.classList.remove('hidden');
            
            // Update profile information
            userEmailElement.textContent = user.email;
            
            // Handle logout
            logoutButton.addEventListener('click', () => {
                auth.signOut().then(() => {
                    window.location.href = 'auth/login.html';
                }).catch((error) => {
                    console.error('Error signing out:', error);
                });
            });
        } else {
            // No user is signed in
            loggedOutState.classList.remove('hidden');
            loggedInState.classList.add('hidden');
        }
    });
});