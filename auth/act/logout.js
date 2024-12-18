import { auth } from '../firebase/config.js';

document.querySelector(".settings-item#logout-button").addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    window.location.href = "../../index.html";
  }).catch((error) => {
    alert(error.message);
  });
});

