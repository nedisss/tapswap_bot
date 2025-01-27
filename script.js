let tg = window.Telegram.WebApp;
tg.expand(); // Expands the WebApp

// Get user ID from Telegram
const userId = tg.initDataUnsafe?.user?.id || "guest";

// Initialize score (use localStorage for persistence)
let score = parseInt(localStorage.getItem("tswap_score")) || 0;
let perTap = 1;
let botActive = false;
let language = localStorage.getItem("language") || "lt";
const upgradeLevels = Array.from({ length: 24 }, (_, i) => ({
    cost: 200 + i * 100,
    bonus: i + 1,
}));

// Language translations
const translations = {
    lt: {
        balance: "Balansas",
        shop: "Parduotuvė",
        buyBot: "Automatinis Botas (100,000 TSwap)",
        botExpired: "Boto laikas baigėsi!",
        tap: "Spauskite moneta, kad gautumėte taškų",
    },
    en: {
        balance: "Balance",
        shop: "Shop",
        buyBot: "Auto Bot (100,000 TSwap)",
        botExpired: "Bot time expired!",
        tap: "Click the coin to earn points",
    },
    ru: {
        balance: "Баланс",
        shop: "Магазин",
        buyBot: "Автобот (100,000 TSwap)",
        botExpired: "Время бота истекло!",
        tap: "Нажмите на монету, чтобы заработать очки",
    },
};

// Change language and update text
function updateLanguage() {
    document.getElementById("balance").innerText = `${translations[language].balance}: ${score} TSwap`;
    document.getElementById("shop-button").innerText = translations[language].shop;
    document.getElementById("buy-bot").innerText = translations[language].buyBot;
    document.getElementById("coin").innerText = "💰";
    document.getElementById("game-name").innerText = translations[language].tap;
}

// Toggle shop visibility
function toggleShop() {
    const shop = document.getElementById("shop");
    shop.style.display = shop.style.display === "none" ? "block" : "none";
    if (shop.style.display === "block") renderUpgrades();
}

// Render upgrades in the shop
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

// Click event for coin
document.getElementById("coin").addEventListener("click", function () {
    score += perTap;
    updateScore();
    saveScore();
});

// Save score to localStorage
function saveScore() {
    localStorage.setItem("tswap_score", score);
}

// Update the displayed score
function updateScore() {
    document.getElementById("balance").innerText = `${translations[language].balance}: ${score} TSwap`;
}

// Buy an upgrade
function buyUpgrade(level, cost, bonus) {
    if (score >= cost) {
        score -= cost;
        perTap = bonus;
        updateScore();
        saveScore();
        alert(`Now you earn: ${perTap} per tap!`);
    } else {
        alert("You don't have enough points!");
    }
}

// Buy Auto Bot
function buyBot() {
    const cost = 100000;
    if (score >= cost && !botActive) {
        score -= cost;
        botActive = true;
        updateScore();
        saveScore();

        const botStatus = document.getElementById("botStatus");
        botStatus.style.display = "block";

        let timeLeft = 3600; // 60 minutes
        const botTimer = document.getElementById("botTimer");

        const interval = setInterval(() => {
            score += 120; // Bot earns 120 TSwap every 0.5 second
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
        alert("You don't have enough points or the bot is already active!");
    }
}

// Format time for bot countdown
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Change language
function changeLanguage(lang) {
    language = lang;
    localStorage.setItem("language", lang); // Save selected language to localStorage
    updateLanguage();
    renderUpgrades();
}

// Initial setup
updateLanguage();
updateScore();
