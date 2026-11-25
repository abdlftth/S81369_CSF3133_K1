// Game state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// Built-in SVG icons matching the example output (used automatically if .png files are missing)
const defaultIcons = {
    rock: "data:image/svg+xml;utf8," + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">' +
        '<rect width="120" height="120" rx="18" fill="#777e82"/>' +
        '<circle cx="60" cy="52" r="24" fill="#5e6973" stroke="#ffffff" stroke-width="2.5"/>' +
        '<text x="60" y="103" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">ROCK</text>' +
        '</svg>'
    ),
    paper: "data:image/svg+xml;utf8," + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">' +
        '<rect width="120" height="120" rx="18" fill="#777e82"/>' +
        '<rect x="40" y="28" width="40" height="48" rx="4" fill="#5e6973" stroke="#ffffff" stroke-width="2.5"/>' +
        '<text x="60" y="103" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">PAPER</text>' +
        '</svg>'
    ),
    scissors: "data:image/svg+xml;utf8," + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">' +
        '<rect width="120" height="120" rx="18" fill="#777e82"/>' +
        '<circle cx="48" cy="64" r="9" fill="none" stroke="#ffffff" stroke-width="2.5"/>' +
        '<circle cx="72" cy="64" r="9" fill="none" stroke="#ffffff" stroke-width="2.5"/>' +
        '<line x1="53" y1="56" x2="72" y2="28" stroke="#ffffff" stroke-width="2.5"/>' +
        '<line x1="67" y1="56" x2="48" y2="28" stroke="#ffffff" stroke-width="2.5"/>' +
        '<text x="60" y="103" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">SCISSORS</text>' +
        '</svg>'
    )
};

// Helper to set image src to rock.png/paper.png/scissors.png with SVG fallback
function setChoiceImage(imgElementId, choice) {
    const img = document.getElementById(imgElementId);
    img.onerror = function () {
        this.onerror = null;
        this.src = defaultIcons[choice];
    };
    img.src = choice + ".png";
}

// Initialize initial images on page load
window.onload = function () {
    setChoiceImage("playerImg", "rock");
    setChoiceImage("computerImg", "rock");
};

// 1. Validate player name and start the game
function startGame() {
    const name = document.getElementById("playerName").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + name + "!";
    document.getElementById("startTime").innerHTML = "Started: " + new Date();
}

// 2. Return a random choice for the computer
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const index = Math.floor(Math.random() * 3);
    return choices[index];
}

// 3. Play one round of Rock, Paper, Scissors
function playRound(playerChoice) {
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    const computerChoice = getComputerChoice();
    roundCount++;

    // Update both images
    setChoiceImage("playerImg", playerChoice);
    setChoiceImage("computerImg", computerChoice);

    const resultEl = document.getElementById("result");
    let roundResult = "";

    // Decide winner with if...else
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        draws++;
        resultEl.innerHTML = "Draw! Both chose " + playerChoice + ".";
        resultEl.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundResult = "Win";
        wins++;
        resultEl.innerHTML = "You Win! " + playerChoice + " beats " + computerChoice + ".";
        resultEl.style.color = "green";
    } else {
        roundResult = "Lose";
        losses++;
        resultEl.innerHTML = "You Lose! " + computerChoice + " beats " + playerChoice + ".";
        resultEl.style.color = "red";
    }

    // Update scoreboard
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Save result and append row to history table
    results.push(roundResult);
    document.getElementById("historyBody").innerHTML +=
        "<tr>" +
        "<td>" + roundCount + "</td>" +
        "<td>" + playerChoice + "</td>" +
        "<td>" + computerChoice + "</td>" +
        "<td>" + roundResult + "</td>" +
        "</tr>";
}

// 4. Count wins using a for loop and display rounded win percentage
function showSummary() {
    if (results.length === 0) {
        document.getElementById("summary").innerHTML = "You played 0 rounds and won 0%";
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    const percentage = Math.round((winCount / results.length) * 100);
    document.getElementById("summary").innerHTML =
        "You played " + results.length + " rounds and won " + percentage + "%";
}

// 5. Reset scores, results array, history table, and messages
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    roundCount = 0;
    results = [];

    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("summary").innerHTML = "";
    setChoiceImage("playerImg", "rock");
    setChoiceImage("computerImg", "rock");
}