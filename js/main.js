import * as THREE from 'three';
import '../style.css'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.querySelector('.canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
const loader = new GLTFLoader();

let earthSphere, marsSphere, moonSphere;
let isEarthHovered = false;
let isMarsHovered = false;
let isMoonHovered = false;

loader.load('./models/sci-fi_spaceship_bridge.glb', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});

const earthDayTexture = new THREE.TextureLoader().load('../images/earth_day_texture.jpg');
const earthNightTexture = new THREE.TextureLoader().load('../images/earth_night_texture.jpg');
const earthRadius = 0.8;
const earthSegments = 32;
const earthGeometry = new THREE.SphereGeometry(earthRadius, earthSegments, earthSegments);
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthDayTexture });
earthSphere = new THREE.Mesh(earthGeometry, earthMaterial);
earthSphere.position.x = 0;
earthSphere.position.y = 1;
scene.add(earthSphere);

const marsTexture = new THREE.TextureLoader().load('../images/mars_texture.jpg');
const marsRadius = 0.5;
const marsSegments = 32;
const marsGeometry = new THREE.SphereGeometry(marsRadius, marsSegments, marsSegments);
const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture });
marsSphere = new THREE.Mesh(marsGeometry, marsMaterial);
marsSphere.position.x = -3;
scene.add(marsSphere);

const moonTexture = new THREE.TextureLoader().load('../images/moon_texture.jpg');
const moonRadius = 0.5;
const moonSegments = 32;
const moonGeometry = new THREE.SphereGeometry(moonRadius, moonSegments, moonSegments);
const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
moonSphere = new THREE.Mesh(moonGeometry, moonMaterial);
moonSphere.position.x = 3;
scene.add(moonSphere);

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enableDamping = true;

camera.position.z = 5;

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, -5);
light.castShadow = true;
scene.add(light);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.addEventListener('mousemove', function (event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersectsEarth = raycaster.intersectObject(earthSphere);
    const intersectsMars = raycaster.intersectObject(marsSphere);
    const intersectsMoon = raycaster.intersectObject(moonSphere);

    isEarthHovered = intersectsEarth.length > 0;
    isMarsHovered = intersectsMars.length > 0;
    isMoonHovered = intersectsMoon.length > 0;
});

document.addEventListener('click', function (event) {
    if (isEarthHovered) {
        window.open('earth_experience.html', '_blank');
    } else if (isMarsHovered) {
        window.open('mars_experience.html', '_blank');
    } else if (isMoonHovered) {
        window.open('moon_experience.html', '_blank');
    }
});

function scaleAndRotatePlanet(planetSphere, isHovered) {
    const scaleFactor = isHovered ? 1.2 : 1; 
    planetSphere.scale.set(scaleFactor, scaleFactor, scaleFactor);
    planetSphere.rotation.y += 0.05;
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    scaleAndRotatePlanet(earthSphere, isEarthHovered);
    scaleAndRotatePlanet(marsSphere, isMarsHovered);
    scaleAndRotatePlanet(moonSphere, isMoonHovered);
    renderer.render(scene, camera);
}

animate();
