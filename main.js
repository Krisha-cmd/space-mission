import * as THREE from 'three';
import './style.css'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.querySelector('.canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
const loader = new GLTFLoader();

loader.load('./models/sci-fi_spaceship_bridge.glb', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});

// EARTH
const earthDayTexture = new THREE.TextureLoader().load('./earth_day_texture.jpg');
const earthNightTexture = new THREE.TextureLoader().load('./earth_night_texture.jpg');
const earthRadius = 0.8;
const earthSegments = 32;
const earthGeometry = new THREE.SphereGeometry(earthRadius, earthSegments, earthSegments);
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthDayTexture });
const earthSphere = new THREE.Mesh(earthGeometry, earthMaterial);
earthSphere.position.x = 0;
earthSphere.position.y=1;
scene.add(earthSphere);

let isEarthHovered = false;

document.addEventListener('mousemove', function (event) {
    const mouse = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
    };

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(earthSphere);

    if (intersects.length > 0) {
        isEarthHovered = true;
    } else {
        isEarthHovered = false;
    }
});

function earthRotation() {
    if (isEarthHovered) {
        earthSphere.rotation.y += 0.05;
    }
}

// Function to switch Earth texture between day and night based on the time of day
function updateEarthTexture() {
    const now = new Date();
    const hours = now.getHours();
    const isDaytime = hours >= 6 && hours < 18;

    if (isDaytime) {
        earthSphere.material.map = earthDayTexture;
    } else {
        earthSphere.material.map = earthNightTexture;
    }
}




const marsTexture = new THREE.TextureLoader().load('./mars_texture.jpg');
const marsRadius = 0.5;
const marsSegments = 32;
const marsGeometry = new THREE.SphereGeometry(marsRadius, marsSegments, marsSegments);
const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture });
const marsSphere = new THREE.Mesh(marsGeometry, marsMaterial);
marsSphere.position.x = -3;
scene.add(marsSphere);

let isMarsHovered = false;

document.addEventListener('mousemove', function (event) {
    const mouse = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
    };

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(marsSphere);

    if (intersects.length > 0) {
        isMarsHovered = true;
    } else {
        isMarsHovered = false;
    }
});

function marsRotation() {
    if (isMarsHovered) {
        marsSphere.rotation.y += 0.05;
    }
}


const moonTexture = new THREE.TextureLoader().load('./moon_texture.jpg');
const moonRadius = 0.5;
const moonSegments = 32;
const moonGeometry = new THREE.SphereGeometry(moonRadius, moonSegments, moonSegments);
const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
const moonSphere = new THREE.Mesh(moonGeometry, moonMaterial);
moonSphere.position.x = 3;
scene.add(moonSphere);


let isMoonHovered = false;

document.addEventListener('mousemove', function (event) {
    const mouse = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
    };

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(moonSphere);

    if (intersects.length > 0) {
        isMoonHovered = true;
    } else {
        isMoonHovered = false;
    }
});	

function moonRotation() {
    if (isMoonHovered) {
        moonSphere.rotation.y += 0.05;
    }
}

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

document.addEventListener('click', function (event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(marsSphere);

    if (intersects.length > 0) {
        window.open('https://mars.nasa.gov/', '_blank');
    }
});


function animate() {
    requestAnimationFrame(animate);
    controls.update();
    updateEarthTexture(); 
    earthRotation();
    moonRotation();
	marsRotation();
    renderer.render(scene, camera);
}

animate();
