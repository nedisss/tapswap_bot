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
        languageChange: "Kalbos pakeitimas"
    },
    en: {
        balance: "Balance",
        tswap: "TSwap",
        click: "Click the coin to earn points",
        shop: "Shop",
        buyUpgrade: "Buy upgrade",
        insufficientPoints: "Not enough points!",
        upgradeSuccess: "Upgrade purchased!",
        languageChange: "Language Change"
    },
    ru: {
        balance: "Баланс",
        tswap: "TSwap",
        click: "Нажмите на монету, чтобы заработать очки",
        shop: "Магазин",
        buyUpgrade: "Купить улучшение",
        insufficientPoints: "Недостаточно очков!",
        upgradeSuccess: "Улучшение куплено!",
        languageChange: "Изменить язык"
    }
};

// Funckija, kuri padeda pakeisti žaidimo kalbą
function changeLanguage(lang) {
    language = lang;
    document.getElementById("score-text").innerText = `${translations[language].balance}: ${score} TSwap`;
    document.getElementById("tswap-balance").innerText = `${translations[language].tswap}: ${tswapBalance}`;
    document.getElementById("coin").innerText = "💰";
    document.getElementById("shop").innerText = translations[language].shop;
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
    } else {
        alert(translations[language].insufficientPoints);
    }
}

// Rodo patobulinimų sąrašą
function renderUpgrades() {
    const upgradesContainer = document.getElementById("upgrades");
    upgradesContainer.innerHTML = '';
    for (let i = currentUpgrade; i < upgradeLevels.length; i++) {
        const button = document.createElement("button");
        button.innerText = `${translations[language].buyUpgrade}: +${upgradeLevels[i].bonus} Tap (${upgradeLevels[i].cost} TSwap)`;
        button.onclick = () => buyUpgrade(i);
        upgradesContainer.appendChild(button);
    }
}

// Atidaro profilio meniu
function openProfileMenu() {
    document.getElementById("profile-menu").style.display = "block";
}

// Pradinis taškų ir kalbos atnaujinimas
updateScore();
