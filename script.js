let score = 0; // Pradinis taškų skaičius
let perClick = 1; // Kiek taškų gauni per paspaudimą
let autoClickerActive = false;

// Atnaujina taškų skaičių ekrane
function updateScore() {
    document.getElementById("score").innerText = "Taškai: " + score;
}

// Moneta – paspaudimas
document.getElementById("coin").addEventListener("click", function () {
    score += perClick;
    updateScore();
});

// Parduotuvė – patobulinimai
function buyUpgrade(cost, increase) {
    if (score >= cost) {
        score -= cost;
        perClick += increase;
        updateScore();
    } else {
        alert("Neužtenka taškų!");
    }
}

// Automatinis botas (60 min)
function buyAutoClicker() {
    if (score >= 20000 && !autoClickerActive) {
        score -= 20000;
        updateScore();
        autoClickerActive = true;
        setInterval(function () {
            score += perClick * 3; // Botas spaudžia kas 2s ir duoda 3x daugiau
            updateScore();
        }, 2000);
    } else if (autoClickerActive) {
        alert("Automatinis botas jau aktyvuotas!");
    } else {
        alert("Neužtenka taškų!");
    }
}
