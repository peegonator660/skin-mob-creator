const baseCanvas = document.getElementById('baseLayer');
const overlayCanvas = document.getElementById('overlayLayer');
const ctxBase = baseCanvas.getContext('2d');
const ctxOverlay = overlayCanvas.getContext('2d');
let activeCanvas = ctxBase;
let currentLayer = 'base';

baseCanvas.width = overlayCanvas.width = 64;
baseCanvas.height = overlayCanvas.height = 64;

function switchLayer() {
    if (currentLayer === 'base') {
        activeCanvas = ctxOverlay;
        currentLayer = 'overlay';
    } else {
        activeCanvas = ctxBase;
        currentLayer = 'base';
    }
}

function initCanvas() {
    ctxBase.fillStyle = '#FF00FF';
    ctxBase.fillRect(0, 0, baseCanvas.width, baseCanvas.height);
    ctxOverlay.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
}

// 3D Model Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(400, 400);
document.getElementById('3dPreview').appendChild(renderer.domElement);

// Load the Minecraft character model here or create a basic cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

function update3DModel() {
    // Combine the base and overlay layers and update the texture
    const combinedCanvas = document.createElement('canvas');
    combinedCanvas.width = 64;
    combinedCanvas.height = 64;
    const combinedCtx = combinedCanvas.getContext('2d');
    combinedCtx.drawImage(baseCanvas, 0, 0);
    combinedCtx.drawImage(overlayCanvas, 0, 0);

    // Use the combined canvas as the texture
    const texture = new THREE.Texture(combinedCanvas);
    texture.needsUpdate = true;
    cube.material.map = texture;
}

initCanvas();
update3DModel();

