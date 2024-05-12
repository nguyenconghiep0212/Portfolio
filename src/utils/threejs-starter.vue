<template>
  <div class="w-full h-full">
    <div ref="el" class="w-full h-full"></div>
  </div>
</template>

<script lang="ts" setup>
  import * as THREE from "three";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";

  import { onMounted, ref } from "vue";

  const el = ref<any>(null);
  const scene = new THREE.Scene();
  let camera: any;
  let orbitControls: any;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: false,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const axesHelper = new THREE.AxesHelper(1_000);
  const gridHelper = new THREE.GridHelper(100, 100);
  scene.add(gridHelper, axesHelper);

  const groundGeo = new THREE.PlaneGeometry(1_000, 1_000, 32, 32);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0xd5d5d5,
    side: THREE.DoubleSide,
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotateX(Math.PI / 2);
  scene.add(ground);

  onMounted(() => {
    scene.background = new THREE.Color("black");
    if (el.value) {
      const { width, height } = el.value.getBoundingClientRect();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1_000_000);
      camera.position.setZ(10);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      el.value.appendChild(renderer.domElement);
      orbitControls = new OrbitControls(camera, renderer.domElement);
      orbitControls.enableDamping = true;
    }
    animate();
  });
  function render(scene: any, camera: any) {
    renderer.render(scene, camera);
  }
  function animate() {
    requestAnimationFrame(animate);
    orbitControls.update();
    render(scene, camera);
  }
</script>
