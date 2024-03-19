import vertexShader from "./shader/vertexShader";
import fragmentShader from "./shader/fragmentShader";
import * as THREE from "three";
import gsap from "gsap";

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

// Textures
const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load(img.src);

const geometry = new THREE.PlaneBufferGeometry(sizes.width, sizes.height, 100, 100); 
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
  uniforms: {
    progress: {
      value: 0.0
    }
  }
}); 
const mesh = new THREE.Mesh( geometry, material ); 
scene.add( mesh );

// Camera
const camera = new THREE.PerspectiveCamera(
  2 * Math.atan((sizes.height / 2) / 100) * 180 / Math.PI,
  sizes.width / sizes.height,
  1,
  1000
)    
camera.position.set(0, 0, 100);
scene.add(camera);

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

// Animation
gsap.to(material.uniforms.progress, {
  value: 1,
  duration: 1,
  delay: 1
})

const tl = gsap.timeline()
tl.to(material.uniforms.progress, {
  value: 1,
  duration: 1,
  delay: 1,
  ease: 'circ.inOut'
})
.to('.text span', {
  y: '0%',
  duration: 0.9,
  stagger: 0.05,
  ease: 'circ.inOut'
}, '-=0.4')

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor( new THREE.Color( 0xCCCCCCC ));

const animate = () => {
  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();
