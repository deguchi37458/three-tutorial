import vertexShader from "./shader/vertexShader";
import fragmentShader from "./shader/fragmentShader";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from 'lil-gui'; 
import gsap from 'gsap'; 

import img from "./images/image01.jpg"

// デバッグ
const gui = new GUI();

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

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.DoubleSide,
  transparent: true,
  uniforms: {
    uTexture: {
      type: 't',
      value: textureLoader.load(img)
    },
    uProgress: {
      value: 0
    },
    uTime: {
      value: 0
    },
    uAnimation: {
      value: 0
    },
    curlR: {
      type: 'f',
      value: 1.0
    },   
  }
})

gsap.to(material.uniforms.uAnimation, {
  value: 1,
  duration: 5
})


// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 
gui.add(material.uniforms.uProgress, 'value', 0,1,0.01).name('progress');


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
controls.enableZoom = false; // ズームを無効化
controls.enablePan = false; // ドラッグ移動を無効化
controls.enableRotate = false; // 回転を無効化

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
  material.uniforms.uTime.value = clock.getElapsedTime();
  
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();
