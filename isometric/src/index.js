import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

import GUI from 'lil-gui';

// shaderを使用するのであれば下記をコメントアウト
// import vertexShader from "./shader/vertexShader";
// import fragmentShader from "./shader/fragmentShader";

// Debug
const dat = new GUI();

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();

// Camera
const fov = 50; // 任意の数値
const fovRad = (fov / 2) * (Math.PI / 180);
let dist = (window.innerHeight / 2) / Math.tan(fovRad);
const camera = new THREE.PerspectiveCamera(
  fov,
  window.innerWidth / window.innerHeight,
  0.1,
  dist * 5
);
camera.position.z = dist;
camera.position.x = dist / 2;
camera.position.y = dist * 1.5;
scene.add(camera);

// Lights
const spotLight = new THREE.SpotLight(0xffffff, 0.5);
spotLight.position.set( dist, dist, dist );
spotLight.castShadow = true;
scene.add(spotLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, -1);
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
scene.add(directionalLight);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.enableZoom = false; // ズームを無効化
// controls.enablePan = false; // ドラッグ移動を無効化
// controls.enableRotate = false; // 回転を無効化

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setClearColor(0xffffff);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

// Mesh
const geometry = new THREE.BoxGeometry( 50, 50, 50 );
const material = new THREE.MeshStandardMaterial({color: "lightblue"});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.z = 200;
// mesh.position.y = (25 *  Math.sqrt(2));
// mesh.position.y = 25;
// mesh.rotation.z = -Math.PI / 4 ;
scene.add(mesh);

// 初期クォータニオン
const startQuaternion = new THREE.Quaternion();
startQuaternion.setFromEuler(new THREE.Euler(0, 0, 0));

// 目標クォータニオン（回転角度）
const endQuaternion = new THREE.Quaternion();
endQuaternion.setFromEuler(new THREE.Euler(0, 0, -Math.PI / 2)); // 90度の回転

// オブジェクトを回転させる関数
const object = { quaternion: startQuaternion.clone() };

const valueObject = { value: 0 };

let move_axis = "x"
let rot_axis = new THREE.Vector3(0, 0, -1);
let rot_dir = 1;
let l = 50
var origin_quaternion = mesh.quaternion.clone();
let origin_pos = mesh.position.clone();

const tl = gsap.timeline({repeat: 100, repeatDelay: 0.5})
tl.to(valueObject, {
  value: 1,
  duration: 0.5,
  onUpdate: () => {
    let x = valueObject.value
    let r = (l / 2) * Math.sqrt(2);
    let center_angle = 45 + (90 * x);
    let center_rad = center_angle * Math.PI / 180;
    let current_height = Math.sin(center_rad) * r;
    let current_move = ((l / 2) - (Math.cos(center_rad) * r));
    mesh.position[move_axis] = origin_pos[move_axis] + current_move
    mesh.position.y = current_height

    let axis = rot_axis
    var new_q = origin_quaternion.clone()
    var target = new THREE.Quaternion();
    var rad90 = Math.PI / 2 * rot_dir;
    var rad = rad90 * x;
    target.setFromAxisAngle(axis, rad);
    new_q.multiply(target);
    mesh.quaternion.copy(new_q)
  },
  onComplete: () => {
    origin_pos = mesh.position.clone();
    if(move_axis == 'x') {
      rot_axis = new THREE.Vector3(-1, 0, 0);
      move_axis = 'z';
    } else {
      rot_axis = new THREE.Vector3(0, 0, -1);
      move_axis = 'x';
    }
    rot_dir = -rot_dir;
  },
  ease: "none",
})

// Text
const ttfLoader = new TTFLoader();
ttfLoader.load('fonts/Inter_Regular.ttf', function (ttfData) {
  const fontLoader = new FontLoader();
  const font = fontLoader.parse(ttfData);
  const fontProperty = {
    font: font,
    size: 300,
    height: 200,
    curveSegments: 120,
    bevelEnabled: true,
    bevelThickness: 0,
  }
  
  const textGeometry1 = new TextGeometry('Hello!', fontProperty);
  const textGeometry2 = new TextGeometry('three.js!', fontProperty);

  // マテリアルの作成
  const material = new THREE.MeshPhongMaterial( { color: "pink" } )

  // メッシュの作成
  const textMesh1 = new THREE.Mesh(textGeometry1, material);
  const textMesh2 = new THREE.Mesh(textGeometry2, material);
  textMesh1.receiveShadow = true;
  textMesh2.receiveShadow = true;
  textMesh1.castShadow = true;
  textMesh2.castShadow = true;
  textMesh1.position.y  = 400

  const textGroup = new THREE.Group();

  textGroup.add(textMesh1);
  textGroup.add(textMesh2);

  textGroup.rotation.x =  -Math.PI / 2;
  textGroup.position.x =  -600;
  scene.add(textGroup);

  // Animate
  const animate = () => {

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    window.requestAnimationFrame(animate);
  };
  animate();
});


// Resize
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


// scene.add(new THREE.AxesHelper(dist));
// scene.add(new THREE.GridHelper(1000, 50));
