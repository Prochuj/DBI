/**
 * Navigation Script for DBI Website
 * Handles active navigation state and mobile menu functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Set active class based on current page
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Remove any existing active class first
        link.classList.remove('active');
        
        // Add active class if this link matches current page
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add keyboard navigation support
    navLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Console message for DBI
    console.log('🌐 Dzień Bezpiecznego Internetu - Nawigacja załadowana');
    console.log('📍 Aktualna strona:', currentPage);
});

/**
 * Highlights navigation link for given URL
 * @param {string} url - URL to highlight
 */
function highlightNavigation(url) {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === url) {
            link.classList.add('active');
        }
    });
}
