/**
 * Quiz Script for DBI Website
 * Interactive quiz about internet safety
 */

document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
    console.log('🧠 DBI Quiz - załadowany');
});

// Quiz questions about internet safety
const quizQuestions = [
    {
        question: "Jakie hasło jest najbezpieczniejsze?",
        answers: [
            "123456",
            "haslo123",
            "MojeP@sw0rd!2024#Bezpieczne",
            "qwerty"
        ],
        correct: 2,
        explanation: "Silne hasło powinno być długie i zawierać wielkie i małe litery, cyfry oraz znaki specjalne."
    },
    {
        question: "Co zrobić, jeśli otrzymasz podejrzany e-mail z linkiem?",
        answers: [
            "Kliknąć w link, żeby sprawdzić co to jest",
            "Odpisać na e-mail z pytaniem",
            "Nie klikać i usunąć wiadomość",
            "Przesłać link znajomym"
        ],
        correct: 2,
        explanation: "Podejrzane e-maile mogą być próbami phishingu. Nigdy nie należy klikać w nieznane linki."
    },
    {
        question: "Które dane osobowe NIE powinny być udostępniane w internecie?",
        answers: [
            "Ulubiony kolor",
            "Adres zamieszkania",
            "Imię psa",
            "Zainteresowania"
        ],
        correct: 1,
        explanation: "Adres zamieszkania to wrażliwe dane osobowe, które mogą zostać wykorzystane przez przestępców."
    },
    {
        question: "Co oznacza skrót 2FA?",
        answers: [
            "Two Factor Authentication",
            "Two Fast Access",
            "To File Access",
            "Two Form Application"
        ],
        correct: 0,
        explanation: "2FA (Two Factor Authentication) to dwuetapowe uwierzytelnianie, które dodaje dodatkową warstwę bezpieczeństwa."
    },
    {
        question: "Jak często należy aktualizować oprogramowanie?",
        answers: [
            "Nigdy, jeśli działa",
            "Raz w roku",
            "Jak najszybciej po pojawieniu się aktualizacji",
            "Tylko gdy komputer działa wolno"
        ],
        correct: 2,
        explanation: "Aktualizacje często zawierają poprawki bezpieczeństwa chroniące przed nowymi zagrożeniami."
    },
    {
        question: "Czym jest phishing?",
        answers: [
            "Nową grą komputerową",
            "Metodą łowienia ryb",
            "Próbą wyłudzenia danych poprzez podszywanie się",
            "Rodzajem antywirusa"
        ],
        correct: 2,
        explanation: "Phishing to oszustwo polegające na podszywaniu się pod zaufane źródła w celu wyłudzenia danych."
    },
    {
        question: "Które zachowanie jest bezpieczne w mediach społecznościowych?",
        answers: [
            "Akceptowanie wszystkich zaproszeń do znajomych",
            "Udostępnianie swojej lokalizacji w czasie rzeczywistym",
            "Ustawienie profilu na prywatny",
            "Podawanie numeru telefonu w postach"
        ],
        correct: 2,
        explanation: "Prywatny profil ogranicza dostęp do Twoich danych tylko do zaakceptowanych przez Ciebie osób."
    },
    {
        question: "Co zrobić, jeśli ktoś Cię nęka w internecie?",
        answers: [
            "Odpowiadać tym samym",
            "Ignorować i nic nie robić",
            "Zablokować osobę i zgłosić to dorosłemu/platformie",
            "Usunąć swoje konto"
        ],
        correct: 2,
        explanation: "Cyberprzemoc należy zgłaszać. Zablokowanie sprawcy i powiadomienie dorosłych to właściwe kroki."
    },
    {
        question: "Dlaczego nie należy używać tego samego hasła do wszystkich kont?",
        answers: [
            "Bo trudno je zapamiętać",
            "Bo w przypadku wycieku, wszystkie konta są zagrożone",
            "Bo system tego nie pozwala",
            "To nieprawda, można używać tego samego hasła"
        ],
        correct: 1,
        explanation: "Jeśli jedno konto zostanie zhakowane, wszystkie inne konta z tym samym hasłem również są zagrożone."
    },
    {
        question: "Kiedy można bezpiecznie podać hasło?",
        answers: [
            "Gdy o to poprosi support techniczny przez e-mail",
            "Gdy o to poprosi znajomy",
            "Nigdy - hasła są tylko dla Ciebie",
            "Gdy wygrasz w loterii"
        ],
        correct: 2,
        explanation: "Nikt legitymy nie będzie prosił o Twoje hasło. Nigdy go nie podawaj, nawet pozornie zaufanym źródłom."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let quizStarted = false;

/**
 * Initializes the quiz functionality
 */
function initQuiz() {
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    
    if (startBtn) {
        startBtn.addEventListener('click', startQuiz);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }
    
    if (restartBtn) {
        restartBtn.addEventListener('click', restartQuiz);
    }
    
    // Set total questions
    const totalQuestionsEl = document.getElementById('total-questions');
    if (totalQuestionsEl) {
        totalQuestionsEl.textContent = quizQuestions.length;
    }
}

/**
 * Starts the quiz
 */
function startQuiz() {
    quizStarted = true;
    currentQuestionIndex = 0;
    score = 0;
    
    // Hide start screen, show question container
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
    
    // Show first question
    showQuestion();
}

/**
 * Displays the current question
 */
function showQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    
    // Update progress
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    
    // Show question text
    document.getElementById('question-text').innerHTML = `<h3>${question.question}</h3>`;
    
    // Create answer buttons
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });
    
    // Hide feedback and next button
    document.getElementById('feedback-container').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
}

/**
 * Handles answer selection
 * @param {number} selectedIndex - Index of selected answer
 */
function selectAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
    
    // Update score
    if (isCorrect) {
        score++;
    }
    
    // Disable all answer buttons and highlight correct/incorrect
    const buttons = document.querySelectorAll('#answers-container button');
    buttons.forEach((button, index) => {
        button.disabled = true;
        
        if (index === question.correct) {
            button.style.backgroundColor = '#d4edda';
            button.style.borderColor = '#28a745';
            button.style.color = '#155724';
        } else if (index === selectedIndex && !isCorrect) {
            button.style.backgroundColor = '#f8d7da';
            button.style.borderColor = '#dc3545';
            button.style.color = '#721c24';
        }
    });
    
    // Show feedback
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackText = document.getElementById('feedback-text');
    
    feedbackContainer.style.display = 'block';
    feedbackText.innerHTML = `
        <strong>${isCorrect ? '✅ Poprawna odpowiedź!' : '❌ Niepoprawna odpowiedź!'}</strong>
        <br><br>
        ${question.explanation}
    `;
    feedbackText.style.color = isCorrect ? '#155724' : '#721c24';
    feedbackContainer.style.backgroundColor = isCorrect ? '#d4edda' : '#f8d7da';
    feedbackContainer.style.padding = '15px';
    feedbackContainer.style.borderRadius = '8px';
    feedbackContainer.style.marginTop = '15px';
    
    // Show next button
    const nextBtn = document.getElementById('next-btn');
    nextBtn.style.display = 'inline-block';
    nextBtn.textContent = currentQuestionIndex === quizQuestions.length - 1 ? 'Zobacz wynik' : 'Następne pytanie';
}

/**
 * Moves to the next question or shows results
 */
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

/**
 * Shows the final results
 */
function showResults() {
    // Hide question container, show results
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    
    // Calculate percentage
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    // Display score
    document.getElementById('score-text').textContent = `${score} / ${quizQuestions.length} (${percentage}%)`;
    
    // Display message based on score
    let message = '';
    if (percentage === 100) {
        message = '🏆 Doskonale! Jesteś ekspertem bezpieczeństwa w internecie!';
    } else if (percentage >= 80) {
        message = '🌟 Świetnie! Masz bardzo dobrą wiedzę o bezpieczeństwie!';
    } else if (percentage >= 60) {
        message = '👍 Dobrze! Ale jest jeszcze miejsce na poprawę.';
    } else if (percentage >= 40) {
        message = '📚 Warto pogłębić wiedzę o bezpieczeństwie w internecie.';
    } else {
        message = '⚠️ Koniecznie przeczytaj porady na naszej stronie!';
    }
    
    document.getElementById('message-text').textContent = message;
    
    // Save score to localStorage
    saveQuizResult(score, quizQuestions.length);
}

/**
 * Restarts the quiz
 */
function restartQuiz() {
    startQuiz();
}

/**
 * Saves quiz result to localStorage
 * @param {number} score - Achieved score
 * @param {number} total - Total questions
 */
function saveQuizResult(score, total) {
    const results = JSON.parse(localStorage.getItem('dbi-quiz-results') || '[]');
    results.push({
        date: new Date().toISOString(),
        score: score,
        total: total,
        percentage: Math.round((score / total) * 100)
    });
    
    // Keep only last 10 results
    if (results.length > 10) {
        results.shift();
    }
    
    localStorage.setItem('dbi-quiz-results', JSON.stringify(results));
}

/**
 * Gets quiz history from localStorage
 * @returns {Array} Array of past quiz results
 */
function getQuizHistory() {
    return JSON.parse(localStorage.getItem('dbi-quiz-results') || '[]');
}

/**
 * Gets the best quiz score
 * @returns {Object|null} Best result or null if no results
 */
function getBestScore() {
    const results = getQuizHistory();
    if (results.length === 0) return null;
    
    return results.reduce((best, current) => {
        return current.percentage > best.percentage ? current : best;
    });
}
