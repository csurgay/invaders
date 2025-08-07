const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.addEventListener("click", (event) => {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    console.log(`Mouse position: (${x}, ${y})`);
    segment.push([x,y]);
});
let img = new Image();
img.src = 'background.png';

const display = [];
const dx = 40, d = 115, dd = 25;
for (let i = 0; i < 6; i++) {
    display.push(new Segment7([
        dx, dx+d, dx+2*d+dd, dx+3*d+dd, dx+4*d+dd, dx+5*d+dd,][i], 
        150, 80, 80, 0.2));
    display[i].digit = "447066"[i];
}
display[6] = new Segment7(670, 20, 80, 80, 0.13);
display[6].digit = "L3";
display[7] = new Segment7(570, 20, 80, 80, 0.13);
display[7].digit = "0";
display[8] = new Segment7(40, 20, 80, 80, 0.13);
display[8].digit = "C";
display[9] = new Segment7(85, 20, 80, 80, 0.13);
display[9].digit = "G";
display[10] = new Segment7(170, 20, 80, 80, 0.13);
display[10].digit = "A";

const segment = [];

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
}

function draw() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
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
    for (let i = 0; i < display.length; i++) {
        display[i].draw();
    }
    if (false) {
        display[Math.floor(6 * Math.random())].digit = 
            Math.floor(Math.random() * 10).toString();
    }

    requestAnimationFrame(draw);
}

draw();
