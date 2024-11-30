import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/FBXLoader.js";

// Initializing variables
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.y = 20;
camera.rotation.x = -30 * THREE.Math.DEG2RAD;
scene.background = new THREE.Color('#002244');
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let model, mixer;
camera.position.z = 15;
const topLight = new THREE.DirectionalLight('white', 1); 
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);
var dino;

let totalModels = 0;
let loadedModels = 0;

let textureLoader = new THREE.TextureLoader();
let fbxLoader = new FBXLoader();
const loader = new GLTFLoader();

let moveInProgress = false;
let isGameStarted = false;