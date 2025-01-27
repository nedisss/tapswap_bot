const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

ctx.fillStyle = "lime";
ctx.fillRect(50, 50, 20, 20); // Piešiame gyvatės segmentą
