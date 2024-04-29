<template>
  <div class="relative w-full h-full">
    <div ref="el" class="w-full h-full"></div>
    <NavOverlay />
  </div>
</template>

<script lang="ts" setup>
  import * as THREE from "three";
  import {
    onBeforeMount,
    onBeforeUnmount,
    onMounted,
    onUnmounted,
    ref,
    toRaw,
    unref,
    watchEffect,
  } from "vue";
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

  const store = useSolarSystem();

  // SET UP CANVAS
  const el = ref(null);
  const scene = new THREE.Scene();
  const animationId = ref<any>(null);
  let camera: any;
  let orbitControls: any;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: false,
  });
  const labelRenderer = new CSS2DRenderer();
  let composer: any;
  // GRID HELPER
  const gridHelper = new THREE.GridHelper(10_000_000, 100);

  // LIGHTING
  const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
  scene.add(ambientLight);

  onMounted(async () => {
    scene.background = new THREE.Color("black");

    // POPULATE SCENE WITH STARS
    // getStarfield(scene);
    const stars = await getStarfield();
    scene.add(stars);

    const { width, height, top } = el.value.getBoundingClientRect();
    camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1_000_000_000_000
    );
    camera.position.set(0, 80_000, 80_000);
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

    // ANIMATE
    animate();

    window.addEventListener("resize", windowResize);
  });

  // onBeforeUnmount(() => {
  //   document.body.removeChild(labelRenderer.domElement);
  //   while (scene.children.length > 0) {
  //     scene.remove(scene.children[0]);
  //   }
  // });

  onBeforeUnmount(() => {
    location.reload()
  })

  emitter.on("move-to-planet", (data: any) => {
    store.selectedPlanet = data;
    const { x, y, z } = store.selectedPlanet.object3d.position;
    camera.position.x =
      x - store.selectedPlanet.planetData.radius * store.scaleDown - 2;
    camera.position.y =
      y + store.selectedPlanet.planetData.radius * store.scaleDown + 1;
    camera.position.z =
      z + store.selectedPlanet.planetData.radius * store.scaleDown + 2;

    orbitControls.target = new THREE.Vector3(x, y, z);
  });

  watchEffect(() => {
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
        planet_generator(e);
      });
      store.planets.forEach((e) => {
        scene.add(toRaw(e.bodySystemObj));
        if (e.path) {
          scene.add(toRaw(e.path.path));
        }
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
    animationId.value = requestAnimationFrame(animate);
    orbitControls.update();
    render(scene, camera);
    // composer.render();

    if (store.planets.length) {
      store.planets.forEach((e) => {
        e.body.rotateY(
          store.realTime
            ? e.raw.synodic_rotation_period / 86_400
            : e.raw.synodic_rotation_period
        );
        if (e.path) {
          toRaw(e.path.animatedPath());
        }
      });
    }

    if (store.selectedPlanet) {
      const { x, y, z } = store.selectedPlanet.object3d.position;
      camera.position.x =
        x - store.selectedPlanet.planetData.radius * store.scaleDown - 2;
      camera.position.y =
        y + store.selectedPlanet.planetData.radius * store.scaleDown + 1;
      camera.position.z =
        z + store.selectedPlanet.planetData.radius * store.scaleDown + 2;

      orbitControls.target = new THREE.Vector3(x, y, z);
    }
  }
</script>
