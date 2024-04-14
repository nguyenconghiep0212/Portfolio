<template>
  <div ref="el" class="w-full h-full"></div>
</template>

<script lang="ts" setup>
  import * as THREE from "three";
  import { onMounted, ref } from "vue";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  import getStarfield from "/@/utils/helper/starField";

  // SET UP CANVAS
  const el = ref(null);
  const scene = new THREE.Scene();
  let camera: any;
  let orbitControls: any;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  const earthSystem = new THREE.Object3D();

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

  function animate() {
    requestAnimationFrame(animate);
    orbitControls.update();
    render(scene, camera);
    // ROTATE EARTH
    earth.rotateY(0.01);
    moon.rotateY(-0.02);
    earthSystem.rotateY(0.001);
  }

  // LIGHTING
  const pointLight1 = new THREE.PointLight(0xffffff, 2, 0, 1);
  pointLight1.position.set(10, 10, 10);
  const pointLight2 = new THREE.PointLight(0xffffff, 3, 500, 0);
  pointLight2.position.set(-35, -5, 20);
  scene.add(pointLight1, pointLight2);

  const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
  scene.add(ambientLight);

  // GRIP HELPER
  const lightHelper1 = new THREE.PointLightHelper(pointLight1);
  const lightHelper2 = new THREE.PointLightHelper(pointLight2);
  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(lightHelper1, lightHelper2, gridHelper);

  // POPULATE SCENE WITH STARS
  const stars = getStarfield();
  scene.add(stars);

  // ADDING EARTH
  const earthTexture = new THREE.TextureLoader().load(
    "src/assets/images/earth.jpg"
  );
  const earthNormalTexture = new THREE.TextureLoader().load(
    "src/assets/images/earth_normal_map.jpg"
  );
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(15, 32, 32),
    new THREE.MeshStandardMaterial({
      map: earthTexture,
      normalMap: earthNormalTexture,
    })
  );

  // ADDING THE MOON AND ORBIT
  const moonTexture = new THREE.TextureLoader().load(
    "src/assets/images/moon.jpg"
  );
  const moonNormalTexture = new THREE.TextureLoader().load(
    "src/assets/images/moon_normal_map.jpg"
  );
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(6.25, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: moonNormalTexture,
    })
  );
  moon.position.set(20, 0, 50);
  const pointLightMoon = new THREE.PointLight(0xffffff, 0.04, 500, 0);
  moon.add(pointLightMoon);

  earthSystem.add(earth, moon);
  scene.add(earthSystem);
</script>
