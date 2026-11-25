// 1. Questions Array
const questions = [
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<css>", "<script>", "<style>", "<link>"],
        correctAnswer: 2
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        correctAnswer: 2
    },
    {
        question: "How do you write 'Hello World' in an alert box in JavaScript?",
        options: ["msg('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');", "alert('Hello World');"],
        correctAnswer: 3
    },
    {
        question: "Which HTML5 semantic element is used to define navigation links?",
        options: ["<nav>", "<navigate>", "<links>", "<header>"],
        correctAnswer: 0
    },
    {
        question: "Which JavaScript method is used to select an HTML element by its ID?",
        options: ["document.querySelectorAll()", "document.getElementById()", "document.getElementByClass()", "document.findElement()"],
        correctAnswer: 1
    }
];

// State Variables
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = null;
let timerInterval;
const TIME_PER_QUESTION = 15;
let timeLeft = TIME_PER_QUESTION;

// DOM Elements
const questionCounterEl = document.getElementById("question-counter");
const timeLeftEl = document.getElementById("time-left");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const feedbackSectionEl = document.getElementById("feedback-section");
const feedbackTextEl = document.getElementById("feedback-text");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreEl = document.getElementById("score");
const scoreDisplayEl = document.getElementById("score-display");

// 2. Randomly shuffles the questions so each quiz is different
function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

// 3. Sets a countdown timer for answering each question
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = TIME_PER_QUESTION;
    timeLeftEl.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

// Handles what happens when the timer reaches 0
function handleTimeOut() {
    const currentQ = shuffledQuestions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll(".option-btn");

    optionButtons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === currentQ.correctAnswer) {
            btn.classList.add("correct");
        }
    });

    feedbackSectionEl.className = "feedback-incorrect";
    feedbackSectionEl.classList.remove("hidden");
    feedbackTextEl.textContent = `Time's up! The correct answer was: ${currentQ.options[currentQ.correctAnswer]}`;

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

// 4. Displays the current question and answer options
function displayQuestion() {
    selectedOptionIndex = null;
    submitBtn.disabled = true;
    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    feedbackSectionEl.classList.add("hidden");

    const currentQ = shuffledQuestions[currentQuestionIndex];
    questionCounterEl.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    questionTextEl.textContent = currentQ.question;

    optionsContainerEl.innerHTML = "";
    currentQ.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(index, button));
        optionsContainerEl.appendChild(button);
    });

    startTimer();
}

// Helper to highlight selected answer before submitting
function selectOption(index, selectedBtn) {
    selectedOptionIndex = index;
    submitBtn.disabled = false;

    const allButtons = document.querySelectorAll(".option-btn");
    allButtons.forEach(btn => btn.classList.remove("selected"));
    selectedBtn.classList.add("selected");
}

// 5. Checks whether the selected answer is correct and updates the score
function checkAnswer() {
    if (selectedOptionIndex === null) return;

    clearInterval(timerInterval);
    const currentQ = shuffledQuestions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll(".option-btn");

    optionButtons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === currentQ.correctAnswer) {
            btn.classList.add("correct");
        } else if (idx === selectedOptionIndex) {
            btn.classList.add("incorrect");
        }
    });

    feedbackSectionEl.classList.remove("hidden");

    if (selectedOptionIndex === currentQ.correctAnswer) {
        score++;
        scoreEl.textContent = score;
        feedbackSectionEl.className = "feedback-correct";
        feedbackTextEl.textContent = "Correct! Well done.";
    } else {
        feedbackSectionEl.className = "feedback-incorrect";
        feedbackTextEl.textContent = `Incorrect. The correct answer is: ${currentQ.options[currentQ.correctAnswer]}`;
    }

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

// 6. Moves to the next question, resetting the timer and updating the screen
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

// Displays final results when all questions are answered
function endQuiz() {
    clearInterval(timerInterval);
    questionCounterEl.textContent = "Quiz Completed";
    questionTextEl.textContent = `You scored ${score} out of ${shuffledQuestions.length}!`;
    optionsContainerEl.innerHTML = "";
    feedbackSectionEl.classList.add("hidden");
    nextBtn.classList.add("hidden");
    submitBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
    scoreDisplayEl.innerHTML = `Final Score: <span id="score">${score} / ${shuffledQuestions.length}</span>`;
}

// 7. Starts the quiz by shuffling questions, displaying the first question, and starting the timer
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    scoreDisplayEl.innerHTML = `Score: <span id="score">0</span>`;
    // Re-bind scoreEl reference after innerHTML update
    window.scoreEl = document.getElementById("score");
    restartBtn.classList.add("hidden");

    shuffleQuestions();
    displayQuestion();
}

// Event Listeners
submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

// Initialize quiz on page load
startQuiz();