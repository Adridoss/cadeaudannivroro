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

function checkCanvasCleared() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparencyCount = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i + 3] === 0) transparencyCount++;
    }

    const clearedPercentage = (transparencyCount / (canvas.width * canvas.height)) * 100;

    if (clearedPercentage > 90) {
        startFireworks();
    }
}

function startFireworks() {
    const fireworks = new Fireworks({
        target: document.body,
        hue: 120,
        startDelay: 1,
        speed: 4,
        acceleration: 1.05,
        friction: 0.95,
        gravity: 1.5,
        maxExplosions: 5,
        explosionMinHeight: 0.2,
        explosionMaxHeight: 0.9,
        explosionChance: 0.06 
    });
    fireworks.start();
}
