<template>
  <div ref="el" class="w-full h-full"></div>
</template>


<script lang="ts" setup>
import * as THREE from "three";
import { onMounted, ref } from "vue";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// SET UP CANVAS
const el = ref(null);
const scene = new THREE.Scene();
let camera: any;
let orbitControls: any;
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
onMounted(() => {
  scene.background = new THREE.Color("black");
  const { width, height } = el.value.getBoundingClientRect();
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.setZ(30);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  el.value.appendChild(renderer.domElement);

  // SET UP ORBIT CONTROL
  orbitControls = new OrbitControls(camera, renderer.domElement);
  // ANIMATE
  animate();
});

// RENDER FUNCTION
function render(scene: any, camera: any) {
  renderer.render(scene, camera);
}

// YOUR FIRST GEOMETRY AND ANIMATION
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: "orange",
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.001;
  torus.rotation.y += 0.02;
  torus.rotation.z += 0.001;

  orbitControls.update();

  render(scene, camera);
}

// POPULATE SCENE WITH STARS
function addStars() {
  const geometry = new THREE.SphereGeometry();
  const material = new THREE.MeshStandardMaterial({ color: "yellow" });

  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(500)
  .fill()
  .forEach(() => {
    addStars();
  });

// LIGHTING
const pointLight1 = new THREE.PointLight(0xffffff, 2, 0, 1);
pointLight1.position.set(10, 10, 10);
const pointLight2 = new THREE.PointLight(0xffffff);
pointLight2.position.set(0, 0, 0);
scene.add(pointLight1, pointLight2);

const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
scene.add(ambientLight);

// LOAD BACKGROUND IMAGE
const loader = new THREE.TextureLoader();
loader.load("src/assets/images/space_bg.jpg", function (texture: any) {
  console.log(texture, "spaceBackground");

  // in this example we create the material when the texture is loaded
  scene.background = texture;
});

// GRIP HELPER
const lightHelper1 = new THREE.PointLightHelper(pointLight1);
const lightHelper2 = new THREE.PointLightHelper(pointLight2);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper1, lightHelper2, gridHelper);
</script>
