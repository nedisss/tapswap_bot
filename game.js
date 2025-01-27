let score = 0;

document.getElementById("startButton").addEventListener("click", function () {
    score++;
    document.getElementById("score").innerText = "Taškai: " + score;
});
