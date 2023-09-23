const canvas = document.getElementById('grattage');
const ctx = canvas.getContext('2d');

// Remplissage initial du canvas avec une couleur grise
ctx.fillStyle = '#CCCCCC';  
ctx.fillRect(0, 0, canvas.width, canvas.height);

let isDrawing = false;

canvas.addEventListener('mousedown', () => {
    isDrawing = true;
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.beginPath();
    checkCanvasCleared();
});

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDrawing = true;
});

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    isDrawing = false;
    ctx.beginPath();
    checkCanvasCleared();
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    draw({clientX: touch.clientX, clientY: touch.clientY});
});

function draw(e) {
    if (!isDrawing) return;
    ctx.lineWidth = 30;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'white';

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

