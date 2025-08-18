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
bg = new Image();
bg.src = 'img/Casio.jpg';
const bgw = 1728/3;
const bgh = 1560/3;
const dx = 128;
const dy = 101;
const dw = 310;
const dh = 140;
