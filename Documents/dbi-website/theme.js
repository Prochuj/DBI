/**
 * Theme Script for DBI Website
 * Handles theme switching (light/dark mode) and user preferences
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('dbi-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply theme
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (systemPrefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
    
    // Create theme toggle button
    createThemeToggle();
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('dbi-theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    console.log('🎨 DBI Theme System - załadowany');
});

/**
 * Applies the specified theme to the page
 * @param {string} theme - 'light' or 'dark'
 */
function applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'dark') {
        root.style.setProperty('--bg-color', '#1a1a2e');
        root.style.setProperty('--text-color', '#eaeaea');
        root.style.setProperty('--card-bg', '#16213e');
        root.style.setProperty('--header-bg', '#0f3460');
        root.style.setProperty('--accent-color', '#e94560');
        
        // Apply dark mode styles
        document.body.style.backgroundColor = '#1a1a2e';
        document.body.style.color = '#eaeaea';
        
        // Update cards and sections
        document.querySelectorAll('.card, .content-section, .tip-card, .info-box, .resource-item, .contact-form').forEach(el => {
            el.style.backgroundColor = '#16213e';
            el.style.color = '#eaeaea';
            el.style.borderColor = '#0f3460';
        });
        
        // Update hero section
        document.querySelectorAll('.hero').forEach(el => {
            el.style.backgroundColor = '#16213e';
            el.style.color = '#eaeaea';
        });
        
        // Update header
        document.querySelectorAll('header').forEach(el => {
            el.style.backgroundColor = '#0f3460';
        });
        
        // Update footer
        document.querySelectorAll('footer').forEach(el => {
            el.style.backgroundColor = '#0f3460';
        });
        
        // Update headings
        document.querySelectorAll('h2, h3, h4').forEach(el => {
            el.style.color = '#e94560';
        });
        
    } else {
        // Reset to light mode (default CSS)
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        
        document.querySelectorAll('.card, .content-section, .tip-card, .info-box, .resource-item, .contact-form').forEach(el => {
            el.style.backgroundColor = '';
            el.style.color = '';
            el.style.borderColor = '';
        });
        
        document.querySelectorAll('.hero').forEach(el => {
            el.style.backgroundColor = '';
            el.style.color = '';
        });
        
        document.querySelectorAll('header').forEach(el => {
            el.style.backgroundColor = '';
        });
        
        document.querySelectorAll('footer').forEach(el => {
            el.style.backgroundColor = '';
        });
        
        document.querySelectorAll('h2, h3, h4').forEach(el => {
            el.style.color = '';
        });
    }
    
    // Update toggle button icon
    updateToggleIcon(theme);
}

/**
 * Creates the theme toggle button
 */
function createThemeToggle() {
    // Check if button already exists
    if (document.getElementById('theme-toggle')) return;
    
    const toggle = document.createElement('button');
    toggle.id = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Przełącz motyw');
    toggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #00cc66;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        font-size: 24px;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: transform 0.3s ease, background-color 0.3s ease;
    `;
    
    toggle.addEventListener('click', toggleTheme);
    toggle.addEventListener('mouseenter', () => {
        toggle.style.transform = 'scale(1.1)';
    });
    toggle.addEventListener('mouseleave', () => {
        toggle.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(toggle);
    
    // Set initial icon
    const currentTheme = localStorage.getItem('dbi-theme') || 'light';
    updateToggleIcon(currentTheme);
}

/**
 * Updates the toggle button icon based on current theme
 * @param {string} theme - Current theme
 */
function updateToggleIcon(theme) {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        toggle.setAttribute('title', theme === 'dark' ? 'Włącz jasny motyw' : 'Włącz ciemny motyw');
    }
}

/**
 * Toggles between light and dark themes
 */
function toggleTheme() {
    const currentTheme = localStorage.getItem('dbi-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    localStorage.setItem('dbi-theme', newTheme);
    applyTheme(newTheme);
    
    // Show notification
    showThemeNotification(newTheme);
    
    console.log('🎨 Motyw zmieniony na:', newTheme);
}

/**
 * Shows a notification about theme change
 * @param {string} theme - New theme name
 */
function showThemeNotification(theme) {
    // Remove existing notification if any
    const existingNotification = document.getElementById('theme-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.id = 'theme-notification';
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: ${theme === 'dark' ? '#0f3460' : '#0066cc'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 1001;
        animation: fadeInOut 3s ease-in-out;
        font-family: Arial, sans-serif;
    `;
    notification.textContent = theme === 'dark' ? 
        '🌙 Włączono ciemny motyw' : 
        '☀️ Włączono jasny motyw';
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
            15% { opacity: 1; transform: translateX(-50%) translateY(0); }
            85% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after animation
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/**
 * Gets the current theme
 * @returns {string} Current theme name
 */
function getCurrentTheme() {
    return localStorage.getItem('dbi-theme') || 'light';
}

/**
 * Resets theme to system default
 */
function resetThemeToSystem() {
    localStorage.removeItem('dbi-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(systemPrefersDark ? 'dark' : 'light');
}
