let score = 0;
let tswapBalance = 0;
let perClick = 1;
let language = 'lt'; // Kalba
let upgradeLevels = [
    { cost: 50, bonus: 2 },
    { cost: 150, bonus: 4 },
    { cost: 250, bonus: 8 },
    { cost: 799, bonus: 24 }
];
let currentUpgrade = 0;

const translations = {
    lt: {
        balance: "Balansas",
        tswap: "TSwap",
        click: "Spauskite monetą, kad uždirbtumėte taškus",
        shop: "Parduotuvė",
        buyUpgrade: "Nusipirkite patobulinimą",
        insufficientPoints: "Trūksta taškų!",
        upgradeSuccess: "Patobulinimas įsigytas!",
        languageChange: "Kalbos pakeitimas",
        convertPoints: "Paversti taškus į Tswap",
        minPointsRequired: "Min 1000 taškų = 1 Tswap"
    },
    en: {
        balance: "Balance",
        tswap: "TSwap",
        click: "Click the coin to earn points",
        shop: "Shop",
        buyUpgrade: "Buy upgrade",
        insufficientPoints: "Not enough points!",
        upgradeSuccess: "Upgrade purchased!",
        languageChange: "Language Change",
        convertPoints: "Convert points to Tswap",
        minPointsRequired: "Min 1000 points = 1 Tswap"
    },
    ru: {
        balance: "Баланс",
        tswap: "TSwap",
        click: "Нажмите на монету, чтобы заработать очки",
        shop: "Магазин",
        buyUpgrade: "Купить улучшение",
        insufficientPoints: "Недостаточно очков!",
        upgradeSuccess: "Улучшение куплено!",
        languageChange: "Изменить язык",
        convertPoints: "Преобразовать очки в Tswap",
        minPointsRequired: "Мин. 1000 очков = 1 Tswap"
    }
};

// Funckija, kuri padeda pakeisti žaidimo kalbą
function changeLanguage(lang) {
    language = lang;
    document.getElementById("score-text").innerText = `${translations[language].balance}: ${score} TSwap`;
    document.getElementById("tswap-balance").innerText = `${translations[language].tswap}: ${tswapBalance}`;
    document.getElementById("coin").innerText = "💰";
    document.getElementById("shop").innerText = translations[language].shop;
    document.getElementById("tswap-conversion").innerText = translations[language].convertPoints;
    document.getElementById("profile-menu").style.display = "none";
}

// Pagrindinė funkcija, kuri vyksta kai paspaudi monetą
function earnPoints() {
    score += perClick;
    updateScore();
}

// Atnaujina žaidimo taškus ir TSwap balansą
function updateScore() {
    document.getElementById("score-text").innerText = `${translations[language].balance}: ${score} TSwap`;
    tswapBalance = Math.floor(score / 1000);
    document.getElementById("tswap-balance").innerText = `${translations[language].tswap}: ${tswapBalance}`;
    saveScore();
}

// Išsaugo žaidimo taškus į localStorage
function saveScore() {
    localStorage.setItem("score", score);
    localStorage.setItem("tswapBalance", tswapBalance);
}

// Atidaro ir uždaro parduotuvę
function toggleShop() {
    const shopMenu = document.getElementById("shop-menu");
    if (shopMenu.style.display === "none") {
        shopMenu.style.display = "block";
        renderUpgrades();
    } else {
        shopMenu.style.display = "none";
    }
}

// Pirkimo patobulinimas
function buyUpgrade(level) {
    if (score >= upgradeLevels[level].cost) {
        score -= upgradeLevels[level].cost;
        perClick = upgradeLevels[level].bonus;
        updateScore();
        alert(translations[language].upgradeSuccess);
        currentUpgrade = level + 1;  // Nusipirkus, pereina į kitą lygį
    } else {
        alert(translations[language].insufficientPoints);
    }
}

// Rodo patobulinimų sąrašą
function renderUp
