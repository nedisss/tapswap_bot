// Telegram WebApp integracija
let tg = window.Telegram.WebApp;
tg.expand(); // Išplečia WebApp

// Gauk vartotojo ID iš Telegram
const userId = tg.initDataUnsafe?.user?.id || null;

if (!userId) {
    alert("Nepavyko gauti Telegram vartotojo ID.");
}

// Taškų ir perTap pradinės reikšmės
let score = 0;
let perTap = 1;
let botActive = false;

// Atkurk taškus iš serverio (jeigu naudojama serverio saugykla)
fetch(`https://tavo-serverio-adresas/get_score?userId=${userId}`)
    .then(response => response.json())
    .then(data => {
        score = data.score || 0;
        perTap = data.perTap || 1;
        updateScore();
    })
    .catch(err => console.error("Nepavyko gauti taškų:", err));

// Atnaujina taškus ekrane
function updateScore() {
    document.getElementById("score").innerText = score;
    tg.MainButton.text = `Tavo taškai: ${score}`; // Rodo taškus Telegram mygtuke
    tg.MainButton.show();
}

// Kai spausi ant monetos
document.getElementById("coin").addEventListener("click", function () {
    score += perTap;
    updateScore();
    saveScore();
});

// Išsaugo taškus serveryje
function saveScore() {
    fetch("https://tavo-serverio-adresas/save_score", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: userId,
            score: score,
            perTap: perTap
        })
    }).catch(err => console.error("Nepavyko išsaugoti taškų:", err));
}

// Parduotuvė: perka „upgradus“
function buyUpgrade(level, cost, bonus) {
    if (score >= cost) {
        score -= cost;
        perTap = bonus;
        updateScore();
        saveScore();
        alert("Dabar už paspaudimą gauni: " + perTap);
    } else {
        alert("Tau trūksta taškų!");
    }
}

// Automatinio boto pirkimas
function buyBot(cost, multiplier) {
    if (score >= cost && !botActive) {
        score -= cost;
        botActive = true;
        updateScore();
        saveScore();

        const botStatus = document.getElementById("botStatus");
        botStatus.style.display = "block";

        let timeLeft = 3600; // 60 minučių
        const botTimer = document.getElementById("botTimer");

        const interval = setInterval(() => {
            score += perTap * multiplier;
            updateScore();
            saveScore();

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

// Pradinis taškų atnaujinimas
updateScore();
