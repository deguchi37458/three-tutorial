import * as THREE from "three";
console.log(THREE)


const width = 960;
const height = 540;

const canvasElement = document.querySelector('#webgl')
const renderer = new THREE.WebGLRenderer({
  canvas: canvasElement,
})

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
camera.position. set(0, 0, 1000);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

renderer.render(scene, camera)
