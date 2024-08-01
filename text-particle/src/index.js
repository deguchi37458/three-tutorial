import vertexShader from "./shader/vertexShader";
import fragmentShader from "./shader/fragmentShader";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler';
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import * as dat from "lil-gui";

// デバッグ(色つけるときに追加)
const gui = new dat.GUI()

// 必須の3要素
// Canvas
const canvas = document.querySelector(".webgl");

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

// Camera
const fov = 75;
const fovRad = (fov / 2) * (Math.PI / 180);
const dist = sizes.height / 2 / Math.tan(fovRad);
const camera = new THREE.PerspectiveCamera(
  fov,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = (0, 0,5);
scene.add(camera);

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Mesh
const setMesh = () => {
  const geometry = new THREE.BufferGeometry();
  const position = new THREE.BufferAttribute(new Float32Array(this.imageList[0].position), 3);
  const color = new THREE.BufferAttribute(new Float32Array(this.imageList[0].color), 3);
  const alpha = new THREE.BufferAttribute(new Float32Array(this.imageList[0].alpha), 1);
  geometry.setAttribute('position', position);
  geometry.setAttribute('color', color);
  geometry.setAttribute('alpha', alpha);

  const material = new THREE.RawShaderMaterial({
     vertexShader: document.querySelector("#js-vertex-shader").textContent,
    fragmentShader: document.querySelector("#js-fragment-shader").textContent,
    transparent: true
  });
  const mesh = new THREE.Points(geometry, material);
  scene.add(mesh);
}

setMesh()

//カメラ制御
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const animate = () => {

  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();

//ブラウザのリサイズ操作
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


// helper 
const gridHelper = new THREE.GridHelper(300, 10);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)
