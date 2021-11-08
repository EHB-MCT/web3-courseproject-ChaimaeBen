import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

//Textures
const loadingManager = new THREE.LoadingManager();

// loadingManager.onStart = () => {
//   console.log("onstart");
// };

// loadingManager.onLoaded = () => {
//   console.log("onLoaded");
// };

// loadingManager.onProgress = () => {
//   console.log("onProgress");
// };

// loadingManager.onError = () => {
//   console.log("onError");
// };
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/checkboard.jpg");
const alphaTexture = textureLoader.load("/textures/alpha.jpg");
const normalTexture = textureLoader.load("/textures/normal.jpg");
const heightTexture = textureLoader.load("/textures/height.png");
const ambientTexture = textureLoader.load("/textures/ambient.jpg");
const metalTexture = textureLoader.load("/textures/metal.jpg");
const roughnessTexture = textureLoader.load("/textures/roughness.jpg");

// colorTexture.repeat.x=2
// colorTexture.repeat.y=3
// colorTexture.wrapS=THREE.RepeatWrapping
// colorTexture.wrapT=THREE.RepeatWrapping

// colorTexture.offset.x=0.5
// colorTexture.rotation = Math.PI*0.5
// colorTexture.center.x= 0.5
// colorTexture.center.y= 0.5

// colorTexture.minFilter= THREE.NearestFilter;


// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene (always)
const scene = new THREE.Scene();

// Objects1 (geometry)              raduis widthfaces heightfaces
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
console.log(geometry.attributes.uv)

// Materials

const material = new THREE.MeshBasicMaterial({ map: colorTexture });

// Mesh (ties object + materials togheter)
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
//how wide canvas element should be when window is changed
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

/**
 * Animate
 */
const clock = new THREE.Clock();
let lastElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
