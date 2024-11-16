import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const loader = new GLTFLoader();
let object = null; 

const url = './models/velociraptor.glb'; 

loader.load(
  url,
  function (gltf) {
    object = gltf.scene;
    object.rotation.y = 91; 
    scene.add(object);
  },
  function (xhr) {
    const loaded = xhr.loaded; 
    const total = xhr.total; 
    console.log((loaded / total * 100) + '% loaded');
  },
  function (error) {
    console.error("didn't load" + error);
  }
);


const renderer = new THREE.WebGLRenderer({ alpha: true }); 
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

camera.position.z = 10;

const topLight = new THREE.DirectionalLight(0xffffff, 10); 
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const moveSpeed = 0.5; 
const acceleration = 0.1; 
let moveDirection = new THREE.Vector3(0, 0, 0);
const targetDirection = new THREE.Vector3(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0x333333, 10);
scene.add(ambientLight);

document.addEventListener('keydown', (event) => {
  if (event.key === 'w') targetDirection.y = 1;
  else if (event.key === 's') targetDirection.y = -1;
  else if (event.key === 'a') targetDirection.x = -1;
  else if (event.key === 'd') targetDirection.x = 1;
  else if(event.key == 'q') targetDirection.z = 1; 
  else if(event.key == 'e') targetDirection.z = -1; 

  event.preventDefault(); 
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'w' || event.key === 's') targetDirection.y = 0;
  else if (event.key === 'a' || event.key === 'd') targetDirection.x = 0;
  else if (event.key === 'q' || event.key === 'e') targetDirection.z = 0;
});

function animateLegs() {
    if (object) {
        // Loop through all children of the object to find the legs
        object.traverse((child) => {
            // Assuming legs are meshes and not null
            if (child.isMesh) {
                // Apply a simple leg animation based on position
                child.rotation.x = Math.sin(Date.now() * 0.005 + child.uuid) * 0.5;
            }
        });
    }
}

function animate() {
  requestAnimationFrame(animate);

  moveDirection.lerp(targetDirection.clone().normalize(), acceleration);
  if (moveDirection.length() > 0) {
      object.position.add(moveDirection.clone().multiplyScalar(moveSpeed));
  }

  animateLegs(); // Call the leg animation function
  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();