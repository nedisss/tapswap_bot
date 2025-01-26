// Garsas paspaudus monetą
const coinSound = new Audio('coin.mp3');

// Išsaugoti duomenys
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let perTap = localStorage.getItem("perTap") ? parseInt(localStorage.getItem("perTap")) : 1;
let botActive = false;

// Monetos paspaudimas
document.getElementById("coin").addEventListener("click", function () {
    score += perTap;
    coinSound.play(); // Groja garsą
    updateScore();
    saveGame();
});

// Atnaujina taškus
function updateScore() {
    document.getElementById("score").innerText = score;
}

// Parduotuvė: Perka „upgradus“
function buyUpgrade(level, cost, bonus) {
    if (score >= cost) {
        score -= cost;
        perTap = bonus;
        updateScore();
        saveGame();
        alert("Dabar už paspaudimą gauni: " + perTap);
    } else {
        alert("Tau trūksta taškų!");
    }
}

// Perka automatizuotą botą
function buyBot(cost, multiplier) {
    if (score >= cost && !botActive) {
        score -= cost;
        botActive = true;
        updateScore();
        saveGame();

        const botStatus = document.getElementById("botStatus");
        botStatus.style.display = "block";

        let timeLeft = 3600; // 60 minučių
        const botTimer = document.getElementById("botTimer");

        const interval = setInterval(() => {
            score += perTap * multiplier;
            updateScore();
            saveGame();

            timeLeft--;
            botTimer.textContent = formatTime(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(interval);
                botActive = false;
                botStatus.style.display = "none";
                alert("Boto laikas baigėsi!");
            }
        }, 1000);
    } else {
        alert("Tau trūksta taškų arba botas jau veikia!");
    }
}

// Pagalbinė funkcija laikui formatuoti
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Išsaugo žaidimą į LocalStorage
function saveGame() {
    localStorage.setItem("score", score);
    localStorage.setItem("perTap", perTap);
}

// Paleidžiame žaidimą su esamais duomenimis
updateScore();
