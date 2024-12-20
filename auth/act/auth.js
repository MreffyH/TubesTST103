document.addEventListener('DOMContentLoaded', function() {

    // Form validation
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (email && password) {
                alert('Login successful!'); 
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (email && password && confirmPassword) {
                if (password === confirmPassword) {
                    alert('Registration successful!'); 
                } else {
                    alert('Passwords do not match.');
                }
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});

