document.addEventListener('DOMContentLoaded', function() {
    const addLandBtn = document.querySelector('.add-land-btn');
    const featureCards = document.querySelectorAll('.feature-card');
    const navItems = document.querySelectorAll('.nav-item');

    addLandBtn.addEventListener('click', function() {
        window.location.href = 'page/lokasi.html';
        // In a real app, you would use: window.location.href = 'add-land.html';
    });

    featureCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = this.getAttribute('href');
            // In a real app, you would use: window.location.href = this.getAttribute('href');
        });
    });

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = this.getAttribute('href');
            // In a real app, you would use: window.location.href = this.getAttribute('href');
        });
    });
});

