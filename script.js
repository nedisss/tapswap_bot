const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
const colorToGuess = document.getElementById('color-to-guess');
const buttonsContainer = document.getElementById('buttons-container');
const startButton = document.getElementById('start-button');

let correctColor = '';

function startGame() {
    buttonsContainer.innerHTML = '';
    correctColor = colors[Math.floor(Math.random() * colors.length)];
    colorToGuess.textContent = `Pasirinkite: ${correctColor}`;

    colors.forEach(color => {
        const button = document.createElement('button');
        button.classList.add('color-button');
        button.style.backgroundColor = color;
        button.addEventListener('click', () => checkAnswer(color));
        buttonsContainer.appendChild(button);
    });
}

function checkAnswer(selectedColor) {
    if (selectedColor === correctColor) {
        alert('Teisingai! Žaidimas baigtas.');
    } else {
        alert('Klaida. Bandykite dar kartą.');
    }
}

startButton.addEventListener('click', startGame);
