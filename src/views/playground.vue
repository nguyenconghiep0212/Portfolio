<template>
  <div ref="el" class="w-full h-full"></div>
</template>

<script lang="ts" setup>
  import * as THREE from "three";
  import { onMounted, ref } from "vue";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  import getStarfield from "/@/utils/helper/starField";
  import createRock from "/@/utils/helper/astroid";

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
  torus.position.set(50, 50, 50);
  // scene.add(torus);
  function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.001;
    torus.rotation.y += 0.02;
    torus.rotation.z += 0.001;

    orbitControls.update();

    render(scene, camera);

    // ROTATE EARTH
    earth.rotation.y -= 0.001;
    moon.rotation.y -= 0.002;
  }

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

  // GRIP HELPER
  const lightHelper1 = new THREE.PointLightHelper(pointLight1);
  const lightHelper2 = new THREE.PointLightHelper(pointLight2);
  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(lightHelper1, lightHelper2, gridHelper);

  // POPULATE SCENE WITH STARS
  // function addStars() {
  //   const geometry = new THREE.SphereGeometry();
  //   const material = new THREE.MeshStandardMaterial({ color: "yellow" });
  //   const star = new THREE.Mesh(geometry, material);
  //   const [x, y, z] = Array(3)
  //     .fill()
  //     .map(() => THREE.MathUtils.randFloatSpread(100));

  //   star.position.set(x, y, z);
  //   scene.add(star);
  // }
  // Array(500)
  //   .fill()
  //   .forEach(() => {
  //     addStars();
  //   });
  const stars = getStarfield();
  scene.add(stars);

  // LOAD BACKGROUND IMAGE
  // const loader = new THREE.TextureLoader();
  // loader.load("src/assets/images/space_bg.png", function (texture: any) {
  //   scene.background = texture;
  // });

  // TEXTURE MAPPING
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
  scene.add(earth);

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

  scene.add(moon);

  // ASTROID
  const astroid = createRock(10);
  astroid.position.set(50, 0, 30);
  scene.add(astroid);
</script>
