document.addEventListener("DOMContentLoaded", () => {
    const player = document.getElementById("player");
    const obstacle = document.getElementById("obstacle");
    const scoreDisplay = document.getElementById("score");
    let isJumping = false;
    let score = 0;
    let gameSpeed = 2000;

    function jump() {
        if (isJumping) return;
        isJumping = true;
        let jumpHeight = 0;
        let jumpInterval = setInterval(() => {
            if (jumpHeight >= 100) {
                clearInterval(jumpInterval);
                let fallInterval = setInterval(() => {
                    if (jumpHeight <= 0) {
                        clearInterval(fallInterval);
                        isJumping = false;
                    }
                    jumpHeight -= 5;
                    player.style.bottom = jumpHeight + "px";
                }, 20);
            }
            jumpHeight += 5;
            player.style.bottom = jumpHeight + "px";
        }, 20);
    }

    function moveObstacle() {
        let obstaclePosition = 600;
        let moveInterval = setInterval(() => {
            if (obstaclePosition < -30) {
                obstaclePosition = 600;
                score++;
                scoreDisplay.textContent = "Taškai: " + score;
                gameSpeed *= 0.98; // Kiekvieną kartą pagreitina
                clearInterval(moveInterval);
                moveObstacle();
            } else {
                obstaclePosition -= 5;
                obstacle.style.right = obstaclePosition + "px";

                // Susidūrimo tikrinimas
                let playerBottom = parseInt(window.getComputedStyle(player).bottom);
                if (obstaclePosition < 80 && obstaclePosition > 20 && playerBottom < 50) {
                    alert("Žaidimas baigtas! Surinkti taškai: " + score);
                    location.reload();
                }
            }
        }, 20);
    }

    document.addEventListener("keydown", (e) => {
        if (e.code === "Space") jump();
    });

    moveObstacle();
});
