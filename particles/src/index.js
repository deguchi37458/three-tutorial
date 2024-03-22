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

// 
const getGeometryPosition = (geometry) => {
  const particlesNum = 10000;
  const material = new THREE.MeshBasicMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  const sampler = new MeshSurfaceSampler(mesh).build();
  const particlesPosition = new Float32Array(particlesNum * 3);

  for (let i =0; i < particlesNum; i++) {
    const newPosition = new THREE.Vector3();
    const normal = new THREE.Vector3();

    sampler.sample(newPosition, normal);
    particlesPosition.set([newPosition.x, newPosition.y, newPosition.z], i * 3);
  }

  console.log(particlesPosition);
  return particlesPosition
}

const setMesh = () => {
  const geometry = new THREE.BufferGeometry();
  
  const firstPos = getGeometryPosition(new THREE.SphereBufferGeometry(1, 32, 32).toNonIndexed());
  const secondPos = getGeometryPosition(new THREE.TorusBufferGeometry(0.7, 0.3, 32, 32).toNonIndexed());
  const thirdPos = getGeometryPosition(new THREE.TorusKnotBufferGeometry(0.6, 0.25, 300, 20, 6, 10).toNonIndexed());
  const fourthPos = getGeometryPosition(new THREE.CylinderBufferGeometry(1, 1, 1, 32, 32).toNonIndexed());
  const fifthPos = getGeometryPosition(new THREE.IcosahedronGeometry(1.1, 0).toNonIndexed());

  const material = new THREE.RawShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uSec1: {
        type: "f",
        value: 0.0
      },
      uSec2: {
        type: "f",
        value: 0.0
      },
      uSec3: {
        type: "f",
        value: 0.0
      },
      uSec4: {
        type: "f",
        value: 0.0
      },
    },
    transparent: true,
    blending: THREE.AdditiveBlending
  })

  geometry.setAttribute("position", new THREE.BufferAttribute(firstPos, 3));
  geometry.setAttribute("secondPosition", new THREE.BufferAttribute(secondPos, 3));
  geometry.setAttribute("thirdPosition", new THREE.BufferAttribute(thirdPos, 3));
  geometry.setAttribute("fourthPosition", new THREE.BufferAttribute(fourthPos, 3));
  geometry.setAttribute("fifthPosition", new THREE.BufferAttribute(fifthPos, 3));

  console.log(geometry)

  const mesh =  new THREE.Points(geometry, material);

  let group = new THREE.Group();
  group.add(mesh)

  setScroll(mesh)
  scene.add(group)
}

const setScroll = (mesh) => {
  gsap.timeline({
    defaults: {},
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.7
    }
  })
  .to(mesh.rotation, {
    x: Math.PI * 2,
    y: Math.PI * 2,
    z: Math.PI * 2
  });

  gsap.to(mesh.material.uniforms.uSec1, {
    value: 1.0,
    scrollTrigger: {
      trigger: "._01",
      start: "bottom bottom",
      end: "bottom top",
      scrub: 0.7,
      markers: true
    }
  });
  gsap.to(mesh.material.uniforms.uSec2, {
    value: 1.0,
    scrollTrigger: {
      trigger: "._02",
      start: "bottom bottom",
      end: "bottom top",
      scrub: 0.7,
      markers: true
    }
  });
  gsap.to(mesh.material.uniforms.uSec3, {
    value: 1.0,
    scrollTrigger: {
      trigger: "._03",
      start: "bottom bottom",
      end: "bottom top",
      scrub: 0.7,
      markers: true
    }
  });
  gsap.to(mesh.material.uniforms.uSec4, {
    value: 1.0,
    scrollTrigger: {
      trigger: "._04",
      start: "bottom bottom",
      end: "bottom top",
      scrub: 0.7,
      markers: true
    }
  });
}

setMesh()

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
