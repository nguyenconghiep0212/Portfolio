<template>
  <div ref="el" class="w-full h-full"></div>
</template>

<script lang="ts" setup>
  import * as THREE from "three";
  import { onMounted, ref } from "vue";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  import getStarfield from "/@/utils/helper/starField";
  import createRock from "/@/utils/helper/astroid";
  import { Star } from "../utils/helper/star";

  // SET UP CANVAS
  const el = ref(null);
  const scene = new THREE.Scene();
  let camera: any;
  let orbitControls: any;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: true,
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
  const obj = new THREE.SphereGeometry(10, 12, 6);
  const mat = new THREE.MeshBasicMaterial({
    wireframe: true,
  });
  const mesh = new THREE.Mesh(obj, mat);
  // mesh.rotateZ(Math.PI / 2)
  scene.add(mesh);
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
  torus.position.set(50, 50, 50);
  // scene.add(torus);
  function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.001;
    torus.rotation.y += 0.02;
    torus.rotation.z += 0.001;

    mesh.rotateY(0.01);

    orbitControls.update();

    render(scene, camera);
  }
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  // LIGHTING
  // PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
  // color - (optional) hexadecimal color of the light. Default is 0xffffff (white).
  // intensity - (optional) numeric value of the light's strength/intensity. Default is 1.
  // distance - Maximum range of the light. Default is 0 (no limit).
  // decay - The amount the light dims along the distance of the light. Default is 2.
  const pointLight1 = new THREE.PointLight(0xffffff, 2, 0, 1);
  pointLight1.position.set(10, 10, 10);
  const pointLight2 = new THREE.PointLight(0xffffff, 5, 500, 0);
  pointLight2.position.set(-35, -5, 20);
  scene.add(pointLight1, pointLight2);

  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  // BACKGROUND
  const loader = new THREE.TextureLoader();
  loader.load("src/assets/images/background.jpg", function (texture: any) {
    scene.background = texture;
  });
  // GRIP HELPER
  const lightHelper1 = new THREE.PointLightHelper(pointLight1);
  const lightHelper2 = new THREE.PointLightHelper(pointLight2);
  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(lightHelper1, lightHelper2, gridHelper);

  function guassianRandom(mean = 0, stdev = 1) {
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    return z * stdev + mean;
  }
  for (let i = 0; i < 200; i++) {
    const pos = new THREE.Vector3(
      guassianRandom(0, 20),
      guassianRandom(0, 20),
      guassianRandom(0, 20)
    );
    const star = new Star(pos);
    star.toThreeObject(scene);
  }
  // getStarfield(scene);
  // ASTROID
  const astroid = createRock(10);
  astroid.position.set(50, 0, 30);
  scene.add(astroid);
</script>
