import vertexShader from "./shader/vertexShader";
import fragmentShader from "./shader/fragmentShader";
import * as THREE from "three";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
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
  dist
);
camera.position.z = dist;
scene.add(camera);

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Geometry
const ttfLoader = new TTFLoader();
ttfLoader.load('fonts/Inter_Regular.ttf', function (ttfData) {
  const fontLoader = new FontLoader();
  const font = fontLoader.parse(ttfData);

  const geometry = new TextGeometry('Hello three.js!', {
    font: font,
    size: 100,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 2,
    bevelOffset: 0,
    bevelSegments: 1
  });

  // マテリアルの作成
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uFrequency: {
        value: 0.035
      },
      uTime: {
        value: 0
      },
      negate: false,
      transparent: true,
    }
  });

  // メッシュの作成
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x  = -400
  scene.add(mesh);

  //カメラ制御
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  
  const clock = new THREE.Clock();
  
  const animate = () => {
    const elapsedTime = clock.getElapsedTime();
  
    material.uniforms.uTime.value = elapsedTime;
  
    controls.update();
    renderer.render(scene, camera);
  
    window.requestAnimationFrame(animate);
  };

  animate();
});


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
// const gridHelper = new THREE.GridHelper(300, 10);
// scene.add(gridHelper);

// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)
