import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader.js';

// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init);

function init() {
  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const canvasElement = document.querySelector('#myCanvas');
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 10000);
  // カメラの初期座標を設定
  camera.position.set(150, 150, 5);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, canvasElement);

  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  // 環境光を追加
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  // 3DS形式のモデルデータを読み込む
  const loader = new THREE.TDSLoader();
  // テクスチャーのパスを指定
  loader.setResourcePath('models/3ds/portalgun/textures/');
  // 3dsファイルのパスを指定
  loader.load('3ds/bottle.3ds', (object) => {
    // 読み込み後に3D空間に追加
    scene.add(object);
  });

  tick();
  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}