import * as THREE from 'three';
import './style.css'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const canvas=document.querySelector('.canvas')
const renderer = new THREE.WebGLRenderer({canvas:canvas});
const loader = new GLTFLoader();

loader.load( './models/sci-fi_spaceship_bridge.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

loader.load( './models/hologram.glb', function ( gltf ) {
  // gltf.scene.scale.set(0.1,0.1,0.1) 
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );
  

} );

renderer.setSize( window.innerWidth, window.innerHeight );


const controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom=false;
controls.enableDamping=true;

camera.position.z = 5;
function animate() {
	requestAnimationFrame( animate );
  controls.update();
	renderer.render( scene, camera );
}
animate();