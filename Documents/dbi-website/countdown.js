/**
 * Countdown Script for DBI Website
 * Displays countdown to the next Safer Internet Day (Dzień Bezpiecznego Internetu)
 * Safer Internet Day is celebrated on the second Tuesday of February each year
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown
    initCountdown();
    
    console.log('⏰ DBI Countdown - załadowany');
});

/**
 * Calculates the next Safer Internet Day
 * Safer Internet Day is on the second Tuesday of February
 * @returns {Date} Date of next Safer Internet Day
 */
function getNextSaferInternetDay() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Find February 1st of current year
    let febFirst = new Date(currentYear, 1, 1); // Month is 0-indexed, so 1 = February
    
    // Find the first Tuesday in February
    let firstTuesday = febFirst;
    while (firstTuesday.getDay() !== 2) { // 2 = Tuesday
        firstTuesday.setDate(firstTuesday.getDate() + 1);
    }
    
    // Second Tuesday is 7 days after first Tuesday
    let secondTuesday = new Date(firstTuesday);
    secondTuesday.setDate(firstTuesday.getDate() + 7);
    
    // If this year's Safer Internet Day has passed, calculate for next year
    if (now > secondTuesday) {
        febFirst = new Date(currentYear + 1, 1, 1);
        firstTuesday = febFirst;
        while (firstTuesday.getDay() !== 2) {
            firstTuesday.setDate(firstTuesday.getDate() + 1);
        }
        secondTuesday = new Date(firstTuesday);
        secondTuesday.setDate(firstTuesday.getDate() + 7);
    }
    
    // Set to 10:00 AM (typical start time for events)
    secondTuesday.setHours(10, 0, 0, 0);
    
    return secondTuesday;
}

/**
 * Initializes the countdown display
 */
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    
    if (!countdownElement) {
        console.warn('Countdown element not found');
        return;
    }
    
    // Get next Safer Internet Day
    const targetDate = getNextSaferInternetDay();
    
    // Display target date
    const dateInfoElement = document.createElement('p');
    dateInfoElement.style.fontSize = '14px';
    dateInfoElement.style.marginTop = '10px';
    dateInfoElement.textContent = `Data: ${formatDate(targetDate)}`;
    countdownElement.parentNode.appendChild(dateInfoElement);
    
    // Update countdown every second
    updateCountdown(targetDate, countdownElement);
    setInterval(() => updateCountdown(targetDate, countdownElement), 1000);
}

/**
 * Updates the countdown display
 * @param {Date} targetDate - Target date to count down to
 * @param {HTMLElement} element - Element to update
 */
function updateCountdown(targetDate, element) {
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff <= 0) {
        element.innerHTML = '🎉 Dziś jest Dzień Bezpiecznego Internetu! 🎉';
        element.style.color = '#ffcc00';
        return;
    }
    
    // Calculate time units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Create countdown display
    element.innerHTML = `
        <div class="countdown-container" style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
            <div class="countdown-item" style="text-align: center;">
                <span style="display: block; font-size: 40px; font-weight: bold;">${days}</span>
                <span style="font-size: 14px;">dni</span>
            </div>
            <div class="countdown-item" style="text-align: center;">
                <span style="display: block; font-size: 40px; font-weight: bold;">${padZero(hours)}</span>
                <span style="font-size: 14px;">godzin</span>
            </div>
            <div class="countdown-item" style="text-align: center;">
                <span style="display: block; font-size: 40px; font-weight: bold;">${padZero(minutes)}</span>
                <span style="font-size: 14px;">minut</span>
            </div>
            <div class="countdown-item" style="text-align: center;">
                <span style="display: block; font-size: 40px; font-weight: bold;">${padZero(seconds)}</span>
                <span style="font-size: 14px;">sekund</span>
            </div>
        </div>
    `;
}

/**
 * Pads a number with leading zero if needed
 * @param {number} num - Number to pad
 * @returns {string} Padded number
 */
function padZero(num) {
    return num.toString().padStart(2, '0');
}

/**
 * Formats a date in Polish format
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    const months = [
        'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
        'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
}

/**
 * Gets days remaining until Safer Internet Day
 * @returns {number} Number of days remaining
 */
function getDaysRemaining() {
    const targetDate = getNextSaferInternetDay();
    const now = new Date();
    const diff = targetDate - now;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Checks if today is Safer Internet Day
 * @returns {boolean} True if today is Safer Internet Day
 */
function isSaferInternetDay() {
    const targetDate = getNextSaferInternetDay();
    const now = new Date();
    
    return now.getDate() === targetDate.getDate() &&
           now.getMonth() === targetDate.getMonth() &&
           now.getFullYear() === targetDate.getFullYear();
}

/**
 * Displays a celebration message if it's Safer Internet Day
 */
function showCelebrationIfToday() {
    if (isSaferInternetDay()) {
        const celebration = document.createElement('div');
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #0066cc, #00cc66);
            color: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            z-index: 2000;
            animation: pulse 2s infinite;
            box-shadow: 0 10px 50px rgba(0,0,0,0.3);
        `;
        celebration.innerHTML = `
            <h2 style="margin: 0 0 15px 0; font-size: 28px;">🎉 Dziś jest Dzień Bezpiecznego Internetu! 🎉</h2>
            <p style="margin: 0; font-size: 18px;">Dbajmy o bezpieczeństwo w sieci razem!</p>
            <button onclick="this.parentElement.remove()" style="
                margin-top: 20px;
                padding: 10px 30px;
                background: white;
                color: #0066cc;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
            ">Zamknij</button>
        `;
        
        document.body.appendChild(celebration);
    }
}

// Check for celebration on load
setTimeout(showCelebrationIfToday, 1000);
