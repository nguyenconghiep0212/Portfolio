<template>
  <div class="relative w-full h-full">
    <div ref="el" class="w-full h-full"></div>
    <div class="absolute top-0 right-0">
      <NavOverlay />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import * as THREE from "three";
  import { onMounted, ref, watch, watchEffect } from "vue";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  import getStarfield from "/@/utils/helper/starField";
  import NavOverlay from "./navOverlay.vue";
  import { useSolarSystem } from "/@/store/solarSystem";
  // PLANETS
  import { sun } from "./Sun";
  import { mercurySystemObj, mercuryPath, mercury } from "./Mercury";
  import { venusSystemObj, venus } from "./Venus";
  import {
    earth,
    earthSystem,
    earthSystemObj,
    earthPath,
    moon,
  } from "./EarthSystem";
  import { marsSystemObj, mars, deimosObj, phobosObj } from "./MarsSystem";
  import { jupiter, jupiterSystemObj } from "./Jupiter";
  import { saturn, saturnSystemObj } from "./Saturn";
  import { uranus, uranusSystemObj } from "./Uranus";
  import { neptune, neptuneSystemObj } from "./Neptune";

  const store = useSolarSystem();

  // SET UP CANVAS
  const el = ref(null);
  const scene = new THREE.Scene();
  let camera: any;
  let orbitControls: any;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  // GRID HELPER
  const gridHelper = new THREE.GridHelper(500, 100);

  onMounted(() => {
    scene.background = new THREE.Color("black");
    const { width, height } = el.value.getBoundingClientRect();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 50, 50);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    el.value.appendChild(renderer.domElement);

    // SET UP ORBIT CONTROL
    orbitControls = new OrbitControls(camera, renderer.domElement);

    // ADD OBJECT TO SCENE
    scene.add(sun);
    scene.add(mercurySystemObj);
    scene.add(venusSystemObj);
    scene.add(earthSystemObj);
    scene.add(marsSystemObj);
    scene.add(jupiterSystemObj);
    scene.add(saturnSystemObj);
    scene.add(uranusSystemObj);
    scene.add(neptuneSystemObj);

    // ANIMATE
    animate();
  });

  watchEffect(() => {
    if (store.displayPath) {
      scene.add(mercuryPath, earthPath);
    } else {
      scene.remove(mercuryPath, earthPath);
    }

    if (store.displayGridHelper) {
      scene.add(gridHelper);
    } else {
      scene.remove(gridHelper);
    }
  });

  // RENDER FUNCTION
  function render(scene: any, camera: any) {
    renderer.render(scene, camera);
  }

  function animate() {
    requestAnimationFrame(animate);
    orbitControls.update();
    render(scene, camera);

    sun.rotateY(0.001);

    // MERCURY
    mercury.rotateY(0.006);
    mercurySystemObj.rotateY(0.01);

    // Venus
    venus.rotateY(0.002);
    venusSystemObj.rotateY(0.003);

    // EARTH ROTATION
    earth.rotateY(0.01);
    moon.rotateY(-0.02);
    earthSystem.rotateY(0.01);
    earthSystemObj.rotateY(0.0009);

    // MARS ROTATION
    marsSystemObj.rotateY(0.0008);
    mars.rotateY(0.01);
    deimosObj.rotateY(0.02);
    phobosObj.rotateY(0.025);

    // JUPITER
    jupiter.rotateY(0.01);
    jupiterSystemObj.rotateY(0.003);

    // SATURN
    saturn.rotateY(0.01);
    saturnSystemObj.rotateY(0.005);

    // URANUS
    uranus.rotateY(0.005);
    uranusSystemObj.rotateY(0.0008);

    // NEPTUNE
    neptune.rotateY(0.002);
    neptuneSystemObj.rotateY(0.0003);
  }

  // LIGHTING
  const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
  scene.add(ambientLight);

  // POPULATE SCENE WITH STARS
  const stars = getStarfield();
  scene.add(stars);

  const loader = new THREE.TextureLoader();
  loader.load("src/assets/images/background.jpg", function (texture: any) {
    scene.background = texture;
  });
</script>
