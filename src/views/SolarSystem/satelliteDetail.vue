<template>
  <div class="my-2 rounded w-[inherit] h-full bg-[#39393c3a] relative">
    <div class="absolute top-1 left-1">
      <n-button class=" opacity-60" secondary>
        <Icon icon="material-symbols:arrow-back" />
      </n-button>
    </div>
    <div class="absolute top-1 right-1">
      <n-button-group vertical>
        <n-button class=" opacity-60" secondary @click="toggleAxis">
          <Icon icon="lucide:axis-3d" />
        </n-button>
        <n-button class=" opacity-60" secondary @click="toggleGrid">
          <Icon icon="teenyicons:view-grid-outline" />
        </n-button>
      </n-button-group>
      <Icon icon="" />
    </div>
    <div ref="planetDetailRef" class="w-full h-2/5"></div>
    <div></div>
  </div>
</template>

<script lang="ts" setup>
  import * as THREE from "three";
  import { onMounted, ref, watchEffect } from "vue";
  import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  import { Icon } from "/@/uikits/Icon";

  const planetDetailRef = ref(null);
  const scene = new THREE.Scene();
  let camera: any;
  let orbitControls: any;
  const gridDisplay = ref(false);
  const axisDisplay = ref(false);
  const gridHelper = new THREE.GridHelper(200, 30);
  const axesHelper = new THREE.AxesHelper(100);
  const loader = new GLTFLoader();
  loader.load(
    "https://res.cloudinary.com/dc7jd2eeu/image/upload/v1714553066/3DModels/james_webb_space_telescope_tqn87i.glb",
    function (gltf: any) {
      const model = gltf.scene;
      scene.add(model);
    },
    undefined,
    function (error: any) {
      console.error(error);
    }
  );

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: false,
  });

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  onMounted(() => {
    setTimeout(() => {
      scene.background = new THREE.Color("black");
      const { width, height } = planetDetailRef.value.getBoundingClientRect();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1_000);
      camera.position.setZ(40);
      camera.position.setY(20);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      planetDetailRef.value.appendChild(renderer.domElement);
      orbitControls = new OrbitControls(camera, renderer.domElement);

      animate();
    }, 1000);
  });
  watchEffect(() => {
    if (gridDisplay.value) {
      scene.add(gridHelper);
    } else {
      scene.remove(gridHelper);
    }
    if (axisDisplay.value) {
      scene.add(axesHelper);
    } else {
      scene.remove(axesHelper);
    }
  });
  function render(scene: any, camera: any) {
    renderer.render(scene, camera);
  }
  function animate() {
    requestAnimationFrame(animate);
    orbitControls.update();

    render(scene, camera);
  }

  function toggleAxis() {
    axisDisplay.value = !axisDisplay.value;
  }
  function toggleGrid() {
    gridDisplay.value = !gridDisplay.value;
  }
</script>
