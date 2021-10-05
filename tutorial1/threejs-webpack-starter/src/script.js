import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { AlphaFormat, MeshStandardMaterial } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//Loading
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("/textures/tiles.jpg");
const textureCrystal = textureLoader.load("/textures/crystalNormal.jpg");
const scifiTexture = textureLoader.load("/textures/scifi.jpg");

const loader = new GLTFLoader();



var newMaterial = new THREE.MeshStandardMaterial();

loader.load( '/models/hello.glb', function ( gltf ) {
  const model = gltf.scene;
  model.position.set(5, 2, 0);
  model.rotation.y = Math.PI / 2;
  model.rotation.x = Math.PI/2;

  newMaterial.metalness = 1;
  newMaterial.normalMap = scifiTexture;

  newMaterial.color = new THREE.Color(0x170129);
  model.traverse((o) => {
    if (o.isMesh)
     o.material = newMaterial;
  });
  scene.add(model);

}, undefined, function ( error ) {

	console.error( error );

} );
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene (always)
const scene = new THREE.Scene();

//background scene load image
const spaceLoader = new THREE.TextureLoader().load("/textures/space2.jpg");
scene.background = spaceLoader;

// Objects1 (geometry)              raduis widthfaces heightfaces
//const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const sphereGeometry = new THREE.SphereBufferGeometry(0.5, 40, 25);
// Materials
//const material = new THREE.MeshBasicMaterial()
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.1;
material.metalness = 0.2;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x170129);

// Mesh (ties object + materials togheter)
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);

//object 2
const sphereGeometry2 = new THREE.SphereBufferGeometry(0.5, 40, 25);

const crystalMaterial = new THREE.MeshStandardMaterial();
crystalMaterial.roughness = 0.1;
crystalMaterial.metalness = 0.5;
crystalMaterial.normalMap = textureCrystal;
crystalMaterial.color = new THREE.Color(0x312787);

const crystal = new THREE.Mesh(sphereGeometry2, crystalMaterial);
scene.add(crystal);

crystal.position.z = 5;
crystal.position.setX(5);




// Lights
const pointLight1 = new THREE.PointLight(0xffffff, 0.1);
pointLight1.position.x = 2;
pointLight1.position.y = 3;
pointLight1.position.z = 4;
scene.add(pointLight1);

//light2
const pointLight2 = new THREE.PointLight(0xf4e2ff, 1);
pointLight2.position.set(0.09, -1.13, 0.43);
pointLight2.intensity = 10;
scene.add(pointLight2);
//1=scale of helper
// const light1 = gui.addFolder("Light 1");

// light1.add(pointLight2.position, "x").min(-6).max(6).step(0.01);
// light1.add(pointLight2.position, "y").min(-3).max(3).step(0.01);
// light1.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
// light1.add(pointLight2, "intensity").min(0).max(10).step(0.01);

// const pointLightHelper1 = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper1);

//light3
const pointLight3 = new THREE.PointLight(0x20b19f, 1);
pointLight3.position.set(0.01, 0.33, 0.67);
pointLight3.intensity = 4.02;
scene.add(pointLight3);

// const light2 = gui.addFolder("Light 2");

// light2.add(pointLight3.position, "x").min(-6).max(6).step(0.01);
// light2.add(pointLight3.position, "y").min(-3).max(3).step(0.01);
// light2.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
// light2.add(pointLight3, "intensity").min(0).max(10).step(0.01);

// const light2Color = {
//   color: 0x20b19f,
// };
// light2.addColor(light2Color, "color").onChange(() => {
//   pointLight3.color.set(light2Color.color);
// });
//1=scale of helper
// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLightHelper3);
/**
 * Sizes
 */


function addStar(){
const geometry = new THREE.SphereGeometry(0.25,24,24);
const material = new THREE.MeshStandardMaterial({color:0xffffff})
const star = new THREE.Mesh(geometry,material)
const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

star.position.set(x, y, z);
scene.add(star);
}

Array(200).fill().forEach(addStar);

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
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

/**
 * Animate
 */
document.addEventListener('mousemove',onMouseMove)
let mouseX=0;
let mouseY=0;

let targetX=0;
let targetY=0;

const windowX = window.innerWidth/2;
const windowY = window.innerHeight/2;


function onMouseMove(event){
mouseX =(event.clientX-windowX)
mouseY= (event.clientY-windowY)
}
const updateSphere=(event)=>{
    sphere.position.y=window.scrollY*.001
}
window.addEventListener('scroll',updateSphere)



const clock = new THREE.Clock();

const tick = () => {
    targetX = mouseX * .001;
    targetY= mouseY * .001;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;
  sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
  sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
  sphere.rotation.z += .5 * (targetY - sphere.rotation.x)

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
