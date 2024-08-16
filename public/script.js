const colorGridContainer = document.getElementById('colorGrid');

// Define a set of colors for the grid
const colors = [
    "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
    "#000000", "#FFFFFF", "#888888", "#FFA500", "#800080", "#008000"
];

// Create color grid buttons
colors.forEach(color => {
    const colorButton = document.createElement('button');
    colorButton.style.backgroundColor = color;
    colorButton.classList.add('colorButton');
    colorButton.addEventListener('click', () => setColor(color));
    colorGridContainer.appendChild(colorButton);
});

let currentColor = colors[0]; // Default to the first color

function setColor(color) {
    currentColor = color;
}

function drawPixel(x, y) {
    activeCanvas.fillStyle = currentColor;
    activeCanvas.fillRect(x, y, 1, 1);
}

baseCanvas.addEventListener('click', (event) => {
    const rect = baseCanvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / rect.width * baseCanvas.width);
    const y = Math.floor((event.clientY - rect.top) / rect.height * baseCanvas.height);
    drawPixel(x, y);
});

overlayCanvas.addEventListener('click', (event) => {
    const rect = overlayCanvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / rect.width * overlayCanvas.width);
    const y = Math.floor((event.clientY - rect.top) / rect.height * overlayCanvas.height);
    drawPixel(x, y);
});

