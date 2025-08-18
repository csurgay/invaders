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

function draw() {
    display.draw();
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
    //drawAll(Segment7.segment10);
    //drawAll(Segment7.segment5);
    requestAnimationFrame(draw);
}

function drawAll(segments) {
    for (let s = 0; s < segments.length; s++) {
        let segment = segments[s];
        if (segment.length > 0) {
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.moveTo(segment[0][0], segment[0][1]);
            for (let i=1; i<segment.length; i++) {
                ctx.lineTo(segment[i][0], segment[i][1]);
            }
            ctx.closePath();
            ctx.fill();
        }
    }
}

draw();
