import vertexShader from "./shader/vertexShader";
import fragmentShader from "./shader/fragmentShader";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import img from "./images/image01.jpg"

// デバッグ
// const gui = new dat.GUI();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load(img.src);

const geometry = new THREE.CylinderGeometry( 5, 5, 3, 16, 16, true); 
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uTexture1: { value: textureLoader.load(img) },
    uTexture2: { value: textureLoader.load(img) },
    uTexture3: { value: textureLoader.load(img) }
  }
}); 
const cylinder = new THREE.Mesh( geometry, material ); 

scene.add( cylinder );

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

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 1);
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
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();
