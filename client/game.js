const socket = io();

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// SOL
let floorGeometry = new THREE.PlaneGeometry(50, 50);
let floorMaterial = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide });
let floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// JOUEUR
let player = new THREE.Mesh(
    new THREE.BoxGeometry(1,2,1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
scene.add(player);

camera.position.z = 5;
camera.position.y = 3;

// BRAINROTS
let brainrots = {};

socket.on("update", (players) => {
    console.log(players);
});

// SPAWN LOCAL TEST
function spawnBrainrot(x, z) {
    let cube = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    cube.position.set(x, 0.5, z);
    scene.add(cube);
}

// TEST
spawnBrainrot(2,2);
spawnBrainrot(-3,1);

// LOOP
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
