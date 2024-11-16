import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

import * as SkeletonUtils from './Users/xaviermondal/Desktop/three/threejs/resources/threejs/r132/examples/jsm/utils/SkeletonUtils.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const loader = new GLTFLoader();
let object = null; 

loader.load(
  './models/velociraptor.glb',
  function (gltf) {
    object = gltf.scene;
    object.rotation.y = 91; 
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {

    console.error("didn't load"+error);
  }
);

function prepModelsAndAnimations() {
  const animsByName = {};
  './models/velociraptor.glb'.gltf.animations.forEach((clip)=>{
    animsByName[clip.name] = clip;
  })
  './models/velociraptor.glb'.animations = animsByName;
}

const mixers = [];

prepModelsAndAnimations();
const clonedScene = SkeletonUtils.clone('./models/velociraptor.glb'.glb.scene);
const root = new THREE.Object3D();
root.add(clonedScene);
scene.add(root);
root.position.x = (ndx - 3) * 3;

const mixer = new THREE.AnimationMixer(clonedScene);
const firstClip = Object.values('./models/velociraptor.glb'.animations)[0];
const action = mixer.clipAction(firstClip);
action.play();
mixers.push(mixer);

const renderer = new THREE.WebGLRenderer({ alpha: true }); 
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

camera.position.z = 10;

const topLight = new THREE.DirectionalLight(0xffffff, 10); 
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

let then = 0;

function render(now) {
  now *= 0.001;  // convert to seconds
  const deltaTime = now - then;
  then = now;
 
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
 
  for (const mixer of mixers) {
    mixer.update(deltaTime);
  }
 
  renderer.render(scene, camera);
 
  requestAnimationFrame(render);
}


/*
const moveSpeed = 0.5; 
const acceleration = 0.5; 
let moveDirection = new THREE.Vector3(0, 0, 0);
const targetDirection = new THREE.Vector3(0, 0, 0);
*/
const ambientLight = new THREE.AmbientLight(0x333333, 10);
scene.add(ambientLight);

/*
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




function animate() {
  requestAnimationFrame(animate);

    
  moveDirection.lerp(targetDirection.clone().normalize(), acceleration);
  
  
  if (moveDirection.length() > 0) {
      object.position.add(moveDirection.clone().multiplyScalar(moveSpeed));
  }

  renderer.render(scene, camera);
}
*/
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});



//animate();