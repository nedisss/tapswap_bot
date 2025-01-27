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
let language = "lt";
const upgradeLevels = Array.from({ length: 24 }, (_, i) => ({
    cost: 200 + i * 100,
    bonus: i + 1,
}));

// Kalbos vertimai
const translations = {
    lt: {
        balance: "Balansas",
        shop: "Parduotuvė",
        buyBot: "Automatinis Botas (100,000 TSwap)",
        botExpired: "Boto laikas baigėsi!",
    },
    en: {
        balance: "Balance",
        shop: "Shop",
        buyBot: "Auto Bot (100,000 TSwap)",
        botExpired: "Bot time expired!",
    },
    ru: {
        balance: "Баланс",
        shop: "Магазин",
        buyBot: "Автобот (100,000 TSwap)",
        botExpired: "Время бота истекло!",
    },
};

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
    document.getElementById("balance").innerText = `${translations[language].balance}: ${score} TSwap`;
}

// Rodo/paslėpia parduotuvės meniu
function toggleShop() {
    const shop = document.getElementById("shop");
    shop.style.display = shop.style.display === "none" ? "block" : "none";
    if (shop.style.display === "block") renderUpgrades();
}

// Kuria parduotuvės patobulinimus
function renderUpgrades() {
    const upgradesContainer = document.getElementById("upgrades");
    upgradesContainer.innerHTML = "";
    upgradeLevels.forEach((level, index) => {
        const button = document.createElement("button");
        button.innerText = `+${level.bonus} Tap (${level.cost} TSwap)`;
        button.onclick = () => buyUpgrade(index + 1, level.cost, level.bonus);
        upgradesContainer.appendChild(button);
    });
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
        alert(`Dabar už paspaudimą gauni: ${perTap}`);
    } else {
        alert("Tau trūksta taškų!");
    }
}

// Automatinio boto pirkimas
function buyBot() {
    const cost = 100000;
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
            score += 120; // Botas duoda po 120 TSwap kas 0.5 sekundės
            updateScore();
            saveScore();

            timeLeft--;
            botTimer.textContent = formatTime(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(interval);
                botActive = false;
                botStatus.style.display = "none";
                alert(translations[language].botExpired);
            }
        }, 500);
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

// Keisti kalbą
function changeLanguage(lang) {
    language = lang;
    document.getElementById("shop-button").innerText = translations[language].shop;
    updateScore();
    renderUpgrades();
}

// Pradinis taškų atnaujinimas
updateScore();
