<template>
  <div class="relative w-full h-full">
    <div ref="el" class="w-full h-full"></div>
    <NavOverlay />
  </div>
</template>

<script lang="ts" setup>
  import * as THREE from "three";
  import { onMounted, ref, watchEffect } from "vue";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
  import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
  import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
  import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

  // HELPER
  import getStarfield from "/@/utils/helper/starField";
  import { planet_generator } from "./PlanetGeneration";
  import { Planet } from "/@/interface/solarSystem";
  import { useSolarSystem } from "/@/store/solarSystem";

  // COMPONENTS
  import NavOverlay from "./navOverlay.vue";

  // API
  import { fetchSolarSystemPlanets } from "/@/api/solarSystem";
  import emitter from "/@/utils/helper/emitter";
  import { AstronomicalUnitToKilometer } from "/@/utils/helper/AstronomicalUnitToKilometer";

  // PLANETS
  // import { sun } from "./Sun";
  // import { mercurySystemObj, mercuryPath, mercury } from "./Mercury";
  // import { venusSystemObj, venus } from "./Venus";
  // import {
  //   earth,
  //   earthSystem,
  //   earthSystemObj,
  //   earthPath,
  //   moon,
  // } from "./EarthSystem";
  // import { marsSystemObj, mars, deimosObj, phobosObj } from "./MarsSystem";
  // import { jupiter, jupiterSystemObj } from "./Jupiter";
  // import { saturn, saturnSystemObj } from "./Saturn";
  // import { uranus, uranusSystemObj } from "./Uranus";
  // import { neptune, neptuneSystemObj } from "./Neptune";

  const store = useSolarSystem();
  const planets: { bodies: any[]; paths: any[] }[] = [];

  // SET UP CANVAS
  const el = ref(null);
  const scene = new THREE.Scene();
  let camera: any;
  let orbitControls: any;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: false,
  });
  const labelRenderer = new CSS2DRenderer();
  let composer: any;
  // GRID HELPER
  const gridHelper = new THREE.GridHelper(10000000, 100);

  // LIGHTING
  const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
  scene.add(ambientLight);

  onMounted(() => {
    scene.background = new THREE.Color("black");

    // POPULATE SCENE WITH STARS
    // getStarfield(scene);
    const stars = getStarfield();
    scene.add(stars);

    const { width, height, top } = el.value.getBoundingClientRect();
    camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1_000_000_000_000
    );
    camera.position.set(0, 80000, 80000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    el.value.appendChild(renderer.domElement);

    // ADD 2D RENDERER
    labelRenderer.setSize(width, height);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = top + "px";
    document.body.appendChild(labelRenderer.domElement);

    // ADD FILTER AND EFFECT
    // const renderScene = new RenderPass(scene, camera);
    // composer = new EffectComposer(renderer);
    // composer.addPass(renderScene);
    // const bloomPass = new UnrealBloomPass(
    //   new THREE.Vector2(width, height), //  resolution of scene
    //   store.BLOOM_PARAMS.strength,
    //   store.BLOOM_PARAMS.radius,
    //   store.BLOOM_PARAMS.threshold
    // );
    // composer.addPass(bloomPass);

    // SET UP ORBIT CONTROL
    orbitControls = new OrbitControls(camera, labelRenderer.domElement);
    orbitControls.zoomSpeed = store.controlSpeed;
    orbitControls.panSpeed = store.controlSpeed;

    // ADD OBJECT TO SCENE
    // scene.add(sun);
    // scene.add(mercurySystemObj);
    // scene.add(venusSystemObj);
    // scene.add(earthSystemObj);
    // scene.add(marsSystemObj);
    // scene.add(jupiterSystemObj);
    // scene.add(saturnSystemObj);
    // scene.add(uranusSystemObj);
    // scene.add(neptuneSystemObj);

    // ANIMATE
    animate();

    window.addEventListener("resize", windowResize);
  });

  emitter.on("move-to-planet", (data: any) => {
    const { x, y, z } = data.object3d.position;
    camera.position.x = x + 3;
    camera.position.y = y + 5;
    camera.position.z = z + 3;

    orbitControls.target = new THREE.Vector3(x, y, z);
  });

  watchEffect(() => {
    // if (store.displayPath) {
    //   scene.add(mercuryPath, earthPath);
    // } else {
    //   scene.remove(mercuryPath, earthPath);
    // }
    if (store.displayGridHelper) {
      scene.add(gridHelper);
    } else {
      scene.remove(gridHelper);
    }
    if (orbitControls) {
      orbitControls.zoomSpeed = store.controlSpeed;
      orbitControls.panSpeed = store.controlSpeed;
    }
  });

  solarSystemTextureMaps();
  async function solarSystemTextureMaps() {
    const temp: any = [];
    const params = {
      filter: [],
    };
    const res = await fetchSolarSystemPlanets(params);
    if (res) {
      res.data.forEach((e: Planet) => {
        if (e.mother_planet) {
          const temp = res.data.find((f: Planet) => f.key === e.mother_planet);
          if (temp) {
            if (temp.moons) {
              temp.moons.push(e);
            } else {
              temp.moons = [];
              temp.moons.push(e);
            }
          }
        } else {
          temp.push(e);
        }
      });
      temp.forEach((e: any) => {
        planets.push(planet_generator(e));
      });
      planets.forEach((e) => {
        e.bodies.forEach((f) => {
          scene.add(f);
        });
        e.paths.forEach((f) => {
          scene.add(f);
        });
      });
    }
  }

  // RESIZE
  function windowResize() {
    const { width, height } = el.value.getBoundingClientRect();
    renderer.setSize(width, height);
  }

  // RENDER FUNCTION
  function render(scene: any, camera: any) {
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }

  function animate() {
    requestAnimationFrame(animate);
    orbitControls.update();
    render(scene, camera);
    // composer.render();

    // sun.rotateY(0.001);

    // // MERCURY
    // mercury.rotateY(0.006);
    // mercurySystemObj.rotateY(0.01);

    // // Venus
    // venus.rotateY(0.002);
    // venusSystemObj.rotateY(0.003);

    // // EARTH ROTATION
    // earth.rotateY(0.01);
    // moon.rotateY(-0.02);
    // earthSystem.rotateY(0.01);
    // earthSystemObj.rotateY(0.0009);

    // // MARS ROTATION
    // marsSystemObj.rotateY(0.0008);
    // mars.rotateY(0.01);
    // deimosObj.rotateY(0.02);
    // phobosObj.rotateY(0.025);

    // // JUPITER
    // jupiter.rotateY(0.01);
    // jupiterSystemObj.rotateY(0.003);

    // // SATURN
    // saturn.rotateY(0.01);
    // saturnSystemObj.rotateY(0.005);

    // // URANUS
    // uranus.rotateY(0.005);
    // uranusSystemObj.rotateY(0.0008);

    // // NEPTUNE
    // neptune.rotateY(0.002);
    // neptuneSystemObj.rotateY(0.0003);
  }
</script>
