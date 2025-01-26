// Tikrina, ar jau yra išsaugoti taškai, jei ne – pradeda nuo 0
let points = localStorage.getItem("points") ? parseInt(localStorage.getItem("points")) : 0;

// Atnaujina ekrane rodomus taškus
function updatePoints() {
    document.getElementById("pointsDisplay").textContent = `Taškai: ${points}`;
}

// Kai paspaudžia ant monetos
document.getElementById("coin").addEventListener("click", function() {
    points += 1; // Kiekvienas paspaudimas prideda tašką
    localStorage.setItem("points", points); // Išsaugo į LocalStorage
    updatePoints();
});

// Pradžioje atnaujina taškų rodymą
updatePoints();
