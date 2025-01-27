let score = 0;
let gameInterval;
let targetInterval;

// Žaidimo laukelis
const gameArea = document.getElementById('game-area');
const scoreElement = document.getElementById('score');

// Funkcija sukurti taikinį
function createTarget() {
    const target = document.createElement('div');
    target.classList.add('target');
    target.style.top = `${Math.random() * (gameArea.clientHeight - 50)}px`;
    target.style.left = `${Math.random() * (gameArea.clientWidth - 50)}px`;

    // Pridedame šaudymo mechanizmą
    target.addEventListener('click', () => {
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
        target.remove();  // Pašalinti taikinį po šūvio
    });

    gameArea.appendChild(target);
}

// Funkcija pradėti žaidimą
function startGame() {
    score = 0;
    scoreElement.textContent = `Score: ${score}`;

    // Sukuriame taikinius kas 2 sekundes
    targetInterval = setInterval(createTarget, 2000);

    // Žaidimas trunka 60 sekundžių
    gameInterval = setTimeout(() => {
        clearInterval(targetInterval);  // Sustabdyti taikinių kūrimą
        alert(`Game Over! Your score: ${score}`);
    }, 60000);
}

// Pradėti žaidimą automatiškai, kai pasikrauna puslapis
window.onload = startGame;
