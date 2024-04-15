<template>
  <div ref="el" class="w-full h-full"></div>
</template>

<script lang="ts" setup>
  import * as THREE from "three";
  import { onMounted, ref } from "vue";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  import getStarfield from "/@/utils/helper/starField";

  // PLANETS
  import {
    MarsSystemObj,
    MarsSystem,
    Mars,
    DeimosObj,
    PhobosObj,
  } from "./MarsSystem";
  import { earth, earthSystem, earthSystemObj, moon } from "./EarthSystem";

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

    // EARTH ROTATION
    earth.rotateY(0.01);
    moon.rotateY(-0.02);
    earthSystem.rotateY(0.01);
    earthSystemObj.rotateY(0.0009);

    // MARS ROTATION
    MarsSystemObj.rotateY(0.0008);
    MarsSystem.rotateY(0.009);
    Mars.rotateY(0.01);
    DeimosObj.rotateY(0.02);
    PhobosObj.rotateY(0.025);
  }

  // LIGHTING
  const pointLight1 = new THREE.PointLight(0xffffff, 2, 500, 0);
  pointLight1.position.set(0, 0, 0);
  // const pointLight2 = new THREE.PointLight(0xffffff, 3, 500, 0);
  // pointLight2.position.set(-35, -5, 20);
  scene.add(pointLight1);

  const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
  scene.add(ambientLight);

  // GRIP HELPER
  const lightHelper1 = new THREE.PointLightHelper(pointLight1);
  // const lightHelper2 = new THREE.PointLightHelper(pointLight2);
  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(lightHelper1, gridHelper);

  // POPULATE SCENE WITH STARS
  const stars = getStarfield();
  scene.add(stars);

  // ADDING SUN
  const sunGeo = new THREE.SphereGeometry(20, 12, 12);
  const sunMat = new THREE.MeshBasicMaterial({
    color: "#FFE600",
    wireframe: true,
  });
  const sun = new THREE.Mesh(sunGeo, sunMat);
  scene.add(sun);

  scene.add(earthSystemObj);
  scene.add(MarsSystemObj);
</script>
