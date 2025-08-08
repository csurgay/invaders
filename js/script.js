const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.addEventListener("click", (event) => {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    console.log(`Mouse position: (${x}, ${y})`);
    segment.push([x,y]);
});
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
}, { passive: false });
const buttonStart = document.getElementById('startButton');
buttonStart.addEventListener("click", () => {
    display.restart();
    segment.length = 0; // Clear the segment array
});
const buttonAim = document.getElementById('aimButton');
buttonAim.addEventListener("click", () => {
    display.stepAim();
});
const buttonShoot = document.getElementById('shootButton');
buttonShoot.addEventListener("click", () => {
    display.shoot();
});
const display = new Display();
display.init();
const segment = [];

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
}

function draw() {
    display.draw();
    ctx.beginPath();
    let a = 0, b = 0;
    if (segment.length > 0) {
        ctx.beginPath();
        ctx.moveTo(a+segment[0][0], b+segment[0][1]);
        for (let i = 1; i < segment.length; i++) {
            ctx.lineTo(a+segment[i][0], b+segment[i][1]);
        }
        ctx.closePath();
        ctx.fillStyle = 'green';
        ctx.fill();
    }
    requestAnimationFrame(draw);
}

draw();
