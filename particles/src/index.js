import vertexShader from "./shader/vertexShader";
import fragmentShader from "./shader/fragmentShader";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from 'gsap'
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
camera.position.z = dist;
scene.add(camera);

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Donuts

const createGeometry = () => {
  const size = 150;
  const segments = 32;
  const geometry = new THREE.BoxGeometry(
    size,
    size,
    size,
    segments,
    segments,
    segments
  );
  
  geometry.morphAttributes.position = [];
  
  const positionAttribute = geometry.attributes.position;

  console.log(geometry);
  
  const spherePositions = [];

  
  for (let i = 0; i < positionAttribute.count; i++) {
    // 立方体の頂点座標を取得
    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    const z = positionAttribute.getZ(i);
  
    // 頂点ベクトルを正規化（長さを同じに）して、球形の頂点にする
    const vertex = new THREE.Vector3(x, y, z);
    const spheredVertex = vertex.normalize().multiplyScalar(size);
  
    spherePositions.push(spheredVertex.x, spheredVertex.y, spheredVertex.z);
  }
  
  geometry.morphAttributes.position[0] = new THREE.Float32BufferAttribute(
    spherePositions,
    3
  );

  return geometry;
}

const geometry = createGeometry();
const material = new THREE.PointsMaterial({
  size: 0.023,
  color: 'FFF'
});
const mesh = new THREE.Points(geometry, material);

scene.add(mesh)

// gui.addColor(donutsParticlesMaterial, 'color');

// Bg Particle
// const count = 5000;
// const particlesGeometry = new THREE.BufferGeometry();
// const positionArray = new Float32Array(count * 3);
// for(let i = 0; i < count * 3; i++){
//   positionArray[i] = (Math.random() - 0.5 ) * 15;
// }

// particlesGeometry.setAttribute(
//   'position',
//   new THREE.BufferAttribute(positionArray, 3)
// )
// const ParticlesMaterial = new THREE.PointsMaterial({
//   size: 0.01,
//   color :"#ffffff"
// })
// const particlesMesh = new THREE.Points(particlesGeometry, ParticlesMaterial)
// scene.add(particlesMesh)

//カメラ制御
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


// アニメーション
// const clock = new THREE.Clock();

const animationParam = {
  value: 0,
};

gsap.to(animationParam, {
  value: 1,
  duration: 3,
  ease: 'Power2.out',
});

const tick = () => {
  // const elapsedTime = clock.getElapsedTime(); // 経過時間を取得
  // camera.position.x = Math.cos(elapsedTime * 0.5) * 6;

  // mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  mesh.morphTargetInfluences[0] = animationParam.value;

  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

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

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)
