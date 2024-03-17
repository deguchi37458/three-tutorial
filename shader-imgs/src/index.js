import vertexShader from "./shader/vertexShader";
import fragmentShader from "./shader/fragmentShader";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import GUI from 'lil-gui'; 
// import gsap from 'gsap'; 

// import img from "./images/image01.jpg"

// デバッグ
// const gui = new GUI();



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
// controls.enablePan = false; // ドラッグ移動を無効化
// controls.enableRotate = false; // 回転を無効化

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);


class ImagePlane {
  constructor(mesh, img) {
    this.refImage = img;
    this.mesh = mesh;
  }

  setParams() {
    // 参照するimg要素から大きさ、位置を取得してセット
    const rect = this.refImage.getBoundingClientRect();

    this.mesh.scale.x = rect.width;
    this.mesh.scale.y = rect.height;

    // const x = rect.left - sizes.width / 2 + rect.width / 2;
    // const y = -rect.top + sizes.height / 2 - rect.height / 2;
    // this.mesh.position.set(x, y, this.mesh.position.z);
  }

  update(offset) {
    // this.setParams();

    this.mesh.material.uniforms.uTime.value = offset; // offetを受け取り代入する
  }
}

const createMesh = (img) => {
  const texture = textureLoader.load(img.src);
  const geometry = new THREE.PlaneGeometry(1, 1, 100, 100);
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
      uTexture: {
        type: 't',
        value: texture
      },
      curlR: {
        type: 'f',
        value: 1
      },
      // uImageAspect: { value: img.naturalWidth / img.naturalHeight },
      // uPlaneAspect: { value: img.clientWidth / img.clientHeight },
      uTime: { value: 0 },
    }
  })

  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
};


const imagePlaneArray = [];

// スクロール追従
let targetScrollY = 0; // 本来のスクロール位置
let currentScrollY = 0; // 線形補間を適用した現在のスクロール位置
let scrollOffset = 0; // 上記2つの差分

// 開始と終了をなめらかに補間する関数
// const lerp = (start, end, multiplier) => {
//   return (1 - multiplier) * start + multiplier * end;
// };

const updateScroll = () => {
  // スクロール位置を取得
  targetScrollY = document.documentElement.scrollTop;
  // リープ関数でスクロール位置をなめらかに追従
  // currentScrollY = lerp(currentScrollY, targetScrollY, 0.1);

  scrollOffset = targetScrollY - currentScrollY;
};

// 毎フレーム呼び出す
const loop = () => {
  updateScroll();
  for (const plane of imagePlaneArray) {
    plane.update(scrollOffset);
  }
  renderer.render(scene, camera);

  requestAnimationFrame(loop);
};

const animate = () => {
  // window.addEventListener('load', () => {
    const imageArray = [...document.querySelectorAll('img')];
    for (const img of imageArray) {
      console.log(img);
      console.log(img.naturalWidth);
      const mesh = createMesh(img);
      scene.add(mesh);

      // const imagePlane = new ImagePlane(mesh, img);
      // imagePlane.setParams();

      // imagePlaneArray.push(imagePlane);
    }
    // loop();

      renderer.render(scene, camera);

      requestAnimationFrame(loop);
  // });
};

animate();



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
