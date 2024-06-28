import vertexShader from "./shader/vertexShader";
import fragmentShader from "./shader/fragmentShader";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
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
const canvas = document.querySelector(".canvas");

// Scene
const scene = new THREE.Scene();

// Camera
const fov = 60; // 視野角
const fovRad = (fov / 2) * (Math.PI / 180);
const dist = (sizes.height / 2 ) / Math.tan(fovRad);
const camera = new PerspectiveCamera(
  fov,
  sizes.width / sizes.height,
  1,
  dist * 2
);
camera.position.z = dist;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.enableZoom = false; // ズームを無効化
// controls.enablePan = false; // ドラッグ移動を無効化
// controls.enableRotate = false; // 回転を無効化

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

// テクスチャローダーを使って画像を読み込む
const textureLoader = new THREE.TextureLoader();
const textures = [
  textureLoader.load('images/product01.png'),
  textureLoader.load('images/product02.png'),
  textureLoader.load('images/product03.png'),
  textureLoader.load('images/product04.png'),
  textureLoader.load('images/product05.png'),
];
const texture = textureLoader.load('images/product00.png');  // 画像のパスを指定

// 画像を大量に表示させるためのグループを作成
const group = new THREE.Group();
const imageCount = 20;  // 画像の数
const imageWidth = 200;   // 画像の幅（スプライトのスケールで調整）

// 画像のスプライトを大量に作成
for (let index = 0; index < 6; index++) { 
  const spriteGroup = new THREE.Group();

  for (let i = 0; i < imageCount; i++) {
    const randomTexture = textures[Math.floor(Math.random() * textures.length)];
    const material = new THREE.SpriteMaterial({ map: randomTexture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(imageWidth, imageWidth, 1);  // スプライトのスケールを設定
    sprite.position.set(
        i * imageWidth - (imageCount * imageWidth) / 2,  // 横に並べる
        0,
        0
    );
    spriteGroup.add(sprite);
  }
  spriteGroup.position.y = (sizes.height / 5 * index) - (sizes.height / 2);
  group.add(spriteGroup);
}
scene.add(group)
console.log(group);

const animate = () => {
  requestAnimationFrame(animate);

  // 任意のアニメーション効果を追加可能
  for (let i = 0; i < group.children.length; i++) {    
    
    group.children[i].children.forEach(sprite => {
      if(i % 2 == 0) {
        sprite.position.x -= 1;

        // 画像が左端に達したら右端に再配置
        if (sprite.position.x < -sizes.width / 2 - imageWidth) {
          sprite.position.x += imageCount * imageWidth;
        }
      } else {
        sprite.position.x += 1;
    
        // 画像が左端に達したら右端に再配置
        if (sprite.position.x > sizes.width / 2 + imageWidth) {
          sprite.position.x -= imageCount * imageWidth;
        }
      }
    });
  }

  renderer.render(scene, camera);
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
