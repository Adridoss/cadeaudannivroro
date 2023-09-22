const canvas = document.getElementById('grattage');
const ctx = canvas.getContext('2d');

// Ajout de la couleur de remplissage initiale
ctx.fillStyle = '#CCCCCC';  
ctx.fillRect(0, 0, canvas.width, canvas.height);

let isDrawing = false;

canvas.addEventListener('mousedown', () => {
    isDrawing = true;
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!isDrawing) return;
    ctx.lineWidth = 80;
    ctx.lineCap = 'round';
    ctx.globalCompositeOperation = 'destination-out';

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

function checkCanvasCleared() {
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparencyCount = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i + 3] === 0) transparencyCount++; // vérifie la transparence
    }

    const clearedPercentage = (transparencyCount / (canvas.width * canvas.height)) * 100;
    console.log("Pourcentage gratté: ", clearedPercentage);

    if (clearedPercentage > 10) { // Si plus de 90% du canvas est gratté
        startFireworks();
    }
}

function startFireworks() {
    console.log("Feux d'artifice déclenchés!");

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

canvas.addEventListener('mouseup', checkCanvasCleared);

