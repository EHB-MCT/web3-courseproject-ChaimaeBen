import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { LoadingManager } from "three";

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/color.jpg");
const alphaTexture = textureLoader.load("/textures/alpha.jpg");
const normalTexture = textureLoader.load("/textures/normal.jpg");
const heightTexture = textureLoader.load("/textures/height.png");
const ambientTexture = textureLoader.load("/textures/ambient.jpg");
const metalTexture = textureLoader.load("/textures/metal.jpg");
const roughnessTexture = textureLoader.load("/textures/roughness.jpg");
const matcapTexture = textureLoader.load('/textures/matcap.jpg')
const gradientTexture = textureLoader.load('/textures/gradient.png') 

const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene (always)
const scene = new THREE.Scene();

 
const material = new THREE.MeshStandardMaterial();
material.shininess = 100;
material.specular = new THREE.Color(0xfff0000);
material.map=colorTexture
material.aoMap= ambientTexture
material.aoMapIntensity = 0.7
material.displacementMap = heightTexture
material.displacementScale=0.1
material.metalnessMap=metalTexture
material.roughnessMap=roughnessTexture
material.normalMap=normalTexture
gui.add(material,'metalness').min(0).max(1).step(0.0001)
gui.add(material,'roughness').min(0).max(1).step(0.0001)

// material.map=colorTexture;
//material.color=new THREE.Color('yellow')
//material.color.set('purple')
//material.color('hex') 'purple' wont work
// material.wireframe=true
// material.opacity=0.5;
// material.transparent=true; needed or opacity won't work

// where side of texture is visble FrontSide(default),BackSide,DoubleSide
// material.side=THREE.BackSide

// material.transparent=true
// material.alphaMap =alphaTexture;

const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(0.5,64,64),material)

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1,1,50,50),material)
console.log(plane.geometry.attributes.uv)
const torus= new THREE.Mesh(new THREE.TorusBufferGeometry(0.3,0.2,64,64),material)

plane.geometry.setAttribute('uv2',new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2))
sphere.geometry.setAttribute('uv2',new THREE.BufferAttribute(sphere.geometry.attributes.uv.array,2))
torus.geometry.setAttribute('uv2',new THREE.BufferAttribute(torus.geometry.attributes.uv.array,2))



scene.add(sphere,plane,torus)

plane.position.x=-2;
torus.position.x=2;


const ambientLight= new THREE.AmbientLight(0xfffffff,0.5)
scene.add(ambientLight)

const pointLight= new THREE.PointLight(0xfffffff,0.5)
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight)
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
      //how much seconds pass since refresh
    const elapsedTime = clock.getElapsedTime();
 //update objects
    sphere.rotation.y = 0.1*elapsedTime;
    plane.rotation.y = 0.1*elapsedTime;
    torus.rotation.y = 0.1*elapsedTime;

    sphere.rotation.x = 0.15*elapsedTime;
    plane.rotation.x= 0.15*elapsedTime;
    torus.rotation.x = 0.15*elapsedTime;

    // Update controls
    controls.update();
  
    // Render
    renderer.render(scene, camera);
  
    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };
  
  tick();
  