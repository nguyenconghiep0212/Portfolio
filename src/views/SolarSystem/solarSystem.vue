<template>
  <div ref="el" class="w-full h-full"></div>
</template>

<script lang="ts" setup>
  import * as THREE from "three";
  import { onMounted, ref } from "vue";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  import getStarfield from "/@/utils/helper/starField";

  // PLANETS
  import { sun, sunLightHelper } from "./Sun";
  import { mercurySystemObj, mercury } from "./Mercury";
  import { venusSystemObj, venus } from "./Venus";
  import {
    earth,
    earthSystem,
    earthSystemObj,
    earthPath,
    moon,
  } from "./EarthSystem";

  import {
    marsSystemObj,
    marsSystem,
    mars,
    deimosObj,
    phobosObj,
  } from "./MarsSystem";

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
    camera.position.set(0, 50, 50);
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
    marsSystem.rotateY(0.009);
    mars.rotateY(0.01);
    deimosObj.rotateY(0.02);
    phobosObj.rotateY(0.025);
  }

  // LIGHTING
  const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
  scene.add(ambientLight);

  // GRIP HELPER
  const gridHelper = new THREE.GridHelper(500, 100);
  scene.add(gridHelper, sunLightHelper);

  // POPULATE SCENE WITH STARS
  const stars = getStarfield();
  scene.add(stars);

  const loader = new THREE.TextureLoader();
  loader.load("src/assets/images/background.jpg", function (texture: any) {
    scene.background = texture;
  });

  scene.add(sun);
  scene.add(mercurySystemObj);
  scene.add(venusSystemObj);
  scene.add(earthSystemObj, earthPath);
  scene.add(marsSystemObj);
</script>
