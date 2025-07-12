// Navigation between sections
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link and corresponding section
            link.classList.add('active');
            const sectionId = `${link.dataset.section}-section`;
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

// Star rating system
function updateStarRating(rating) {
    const starElements = document.querySelectorAll('.stars');
    const ratingElements = document.querySelectorAll('.rating');
    
    // Calculate stars (1 star per 400 rating points, max 5 stars)
    const starCount = Math.min(5, Math.floor(rating / 400));
    const stars = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
    
    // Update all star displays
    starElements.forEach(el => {
        el.textContent = stars;
    });
    
    // Update all rating displays
    ratingElements.forEach(el => {
        el.textContent = rating;
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    updateStarRating(1200); // Initial rating
    
    // Update streak daily
    const lastPlayed = localStorage.getItem('lastPlayed');
    const currentDate = new Date().toDateString();
    const streakCount = document.getElementById('streak-count');
    
    if (lastPlayed === currentDate) {
        // Already played today
    } else if (lastPlayed && 
               new Date(lastPlayed).getTime() === new Date(new Date().setDate(new Date().getDate() - 1)).getTime()) {
        // Played yesterday - increment streak
        const currentStreak = parseInt(localStorage.getItem('streak')) || 0;
        localStorage.setItem('streak', currentStreak + 1);
        streakCount.textContent = currentStreak + 1;
    } else {
        // New streak
        localStorage.setItem('streak', 1);
        streakCount.textContent = '1';
    }
    
    localStorage.setItem('lastPlayed', currentDate);
    
    // Load saved streak
    const savedStreak = localStorage.getItem('streak');
    if (savedStreak) {
        streakCount.textContent = savedStreak;
    }
});
