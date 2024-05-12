<template>
  <div class="w-full h-full bg-[#39393c3a] relative">
    <div class="absolute flex flex-col space-y-1 top-1 left-1">
      <div class="flex justify-start w-min">
        <n-button
          class="bg-black opacity-60"
          secondary
          @click="returnToHomepage"
        >
          <Icon icon="material-symbols:arrow-back" />
        </n-button>
      </div>

      <!-- BUILDING DETAIL -->
      <div
        v-if="selectedModel"
        class="bg-opacity-50 bg-black p-2 rounded w-[30vw] h-[60vh] flex flex-col justify-start items-start"
      >
        <div class="flex items-center justify-between w-full h-min">
          <div class="text-lg tracking-widest font-bold opacity-60">
            {{ selectedModel.data.name }}
          </div>
          <div>
            <Icon
              class="cursor-pointer opacity-60"
              icon="material-symbols:close-rounded"
              @click="handleCloseDetail"
            />
          </div>
        </div>

        <div class="flex flex-col h-full overflow-y-auto floor-list">
          <div v-for="(item, index) in floors" :key="index">
            <div
              class="flex items-center justify-between w-full py-2 pr-1"
              style="border-top: 1px solid #37373787"
            >
              <div
                class="text-lg tracking-widest uppercase text- font-bold opacity-80"
              >
                {{ item }}
              </div>
              <div>
                <n-button secondary @click="handleViewFloor(item)">
                  <Icon icon="mdi:rotate-3d" />
                </n-button>
              </div>
            </div>
            <div class="text-left">
              <span class="text-lg tracking-widest font-bold opacity-60">
                Description:
              </span>
              <span class="opacity-70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat</span
              >
            </div>
          </div>
        </div>
      </div>
      <!--  -->
    </div>

    <div class="absolute -translate-x-1/2 top-2 left-1/2">
      <div class="text-lg tracking-widest font-bold opacity-60">TOWN MODEL</div>
    </div>
    <div class="absolute top-1 right-1">
      <div class="flex flex-col items-end space-y-0.5">
        <n-button class="bg-black opacity-60" secondary @click="toggleAxis">
          <Icon
            :class="axisDisplay ? 'text-red-400' : 'text-white'"
            icon="lucide:axis-3d"
          />
        </n-button>
        <n-button class="bg-black opacity-60" secondary @click="toggleGrid">
          <Icon
            :class="gridDisplay ? 'text-red-400' : 'text-white'"
            icon="teenyicons:view-grid-outline"
          />
        </n-button>
        <n-button
          class="bg-black opacity-60"
          secondary
          @click="toggleWireframe"
        >
          <Icon
            :class="wireframeDisplay ? 'text-red-400' : 'text-white'"
            icon="iconoir:xray-view"
          />
        </n-button>
        <div class="space-x-0.5 flex items-center">
          <div
            :class="`${
              lightDirectionDisplay ? 'w-[10vw]' : 'w-0'
            } opacity-60 bg-black rounded h-[34px] flex items-center transition-all duration-100 overflow-hidden`"
          >
            <n-slider
              v-model:value="lightDegree"
              class="mx-4"
              size="mini"
              :tooltip="false"
              :max="178"
              :min="2"
              :step="1"
            >
              <template #thumb>
                <n-icon-wrapper
                  class="bg-red-400"
                  :size="24"
                  :border-radius="12"
                >
                  <Icon class="text-white" icon="solar:sun-2-bold-duotone" />
                </n-icon-wrapper>
              </template>
            </n-slider>
          </div>
          <n-button class="bg-black opacity-60" secondary @click="toggleLight">
            <Icon
              :class="lightDirectionDisplay ? 'text-red-400' : 'text-white'"
              icon="solar:sun-bold-duotone"
            />
          </n-button>
        </div>
        <n-button
          class="bg-black opacity-60"
          secondary
          @click="toggleLightHelper"
        >
          <Icon
            :class="lightHelperDisplay ? 'text-red-400' : 'text-white'"
            icon="ph:headlights-bold"
          />
        </n-button>
        <n-button class="bg-black opacity-60" secondary @click="resetCamera">
          <Icon icon="mdi:eye-refresh-outline" />
        </n-button>
      </div>
      <Icon icon="" />
    </div>
    <div ref="el" class="w-full h-full"></div>
  </div>
</template>

<script lang="ts" setup>
  import * as THREE from "three";
  import { onMounted, ref, watchEffect } from "vue";
  import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";

  import { useRouter } from "vue-router";
  import { gsap } from "gsap";
  import { housesPosition, floors } from "./mock";
  import { fetchBuildings } from "/@/api/building";
  import Stats from "three/addons/libs/stats.module.js";

  const router = useRouter();
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const el = ref<any>(null);
  const scene = new THREE.Scene();
  const stats = new Stats();
  document.body.appendChild(stats.dom);
  const cameraDefaultPos = { x: 0, y: 200, z: 300 };
  const cameraDefaultTarget = { x: 0, y: 0, z: 0 };
  let camera: any;
  let orbitControls: any;
  let modelSrc: any[] = [];
  // OPTION
  const gridDisplay = ref(false);
  const axisDisplay = ref(false);
  const wireframeDisplay = ref(false);
  const lightHelperDisplay = ref(false);
  const lightDirectionDisplay = ref(false);
  const axesHelper = new THREE.AxesHelper(1_000);
  const lightDegree = ref(40);

  const selectedModel = ref<any>(null);
  const models = ref<any>([]);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: false,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // GROUND
  const groundTexture = new THREE.TextureLoader().load(
    "https://res.cloudinary.com/dc7jd2eeu/image/upload/v1714763167/TownModel/b36sgcjfwfseo6awdcjm.jpg"
  );
  const groundGeo = new THREE.PlaneGeometry(1_000, 1_000, 32, 32);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0xd5d5d5,
    side: THREE.DoubleSide,
    map: groundTexture,
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotateX(Math.PI / 2);
  ground.castShadow = false;
  ground.receiveShadow = true;
  scene.add(ground);

  // LIGHTING
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
  directionalLight.position.set(200, 1_000, 400);
  directionalLight.castShadow = true;
  const d = 1_000;
  const r = 20;
  const mapSize = 2_000;
  directionalLight.shadow.bias = -0.0006;
  directionalLight.shadow.radius = r;
  directionalLight.shadow.mapSize.width = mapSize;
  directionalLight.shadow.mapSize.height = mapSize;
  directionalLight.shadow.camera.top = directionalLight.shadow.camera.right = d;
  directionalLight.shadow.camera.bottom = directionalLight.shadow.camera.left =
    -d;
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 4_000;
  directionalLight.shadow.camera.visible = true;
  const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
  scene.add(directionalLight);
  const shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);

  watchEffect(() => {
    let temp = 0;
    if (lightDegree.value > 90) {
      temp = lightDegree.value - 180;
    } else {
      temp = lightDegree.value;
    }
    const a = Math.sin((temp * Math.PI) / 180);

    gsap.to(directionalLight.position, {
      x: a > 0 ? 300 - 300 * a : -(300 + 300 * a),
      y: 1000 * Math.abs(a),
      z: a > 0 ? 500 - 500 * a : -(500 + 500 * a),
      duration: 0.1,
      onUpdate: function () {
        orbitControls.update();
      },
      onComplete: () => {
        orbitControls.enabled = true;
      },
    });
  });

  onMounted(() => {
    scene.background = new THREE.Color("black");
    if (el.value) {
      const { width, height } = el.value.getBoundingClientRect();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1_000_000);
      camera.position.setZ(cameraDefaultPos.z);
      camera.position.setY(cameraDefaultPos.y);
      camera.position.setX(cameraDefaultPos.x);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      el.value.appendChild(renderer.domElement);
      orbitControls = new OrbitControls(camera, renderer.domElement);
      orbitControls.enableDamping = true;
      orbitControls.enablePan = false;
      orbitControls.minDistance = 100;
      orbitControls.maxDistance = 400;
      orbitControls.minPolarAngle = 0.2;
      orbitControls.maxPolarAngle = 1.5;
    }
    renderer.domElement.addEventListener("mousedown", onMouseOverObject, false);
    animate();
    getModelSrc();
    simulateHouses();
  });
  function render(scene: any, camera: any) {
    renderer.render(scene, camera);
  }
  function animate() {
    requestAnimationFrame(animate);
    orbitControls.update();
    render(scene, camera);
    stats.update()
  }

  // MOUSE EVENT
  document.addEventListener("mousedown", () => {
    document.documentElement.style.cursor = "none";
  });
  document.addEventListener("mouseup", () => {
    document.documentElement.style.cursor = "auto";
  });
  function onMouseOverObject(event: MouseEvent) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(scene, true);
    if (intersects.length > 0) {
      const object = intersects[0].object;
      if (ground.id != object.id) {
        try {
          scene.traverse((e: any) => {
            if (e.isMesh) e.material.color.set(0xd5d5d5);
          });
          object.material.color.set(0xff9b9b);
          selectedModel.value = models.value.find((e: any) =>
            e.model.children.some((f: any) => f.id === object.id)
          );
          exploreAnimation(selectedModel.value);
        } catch (error) {
          console.error("error", error);
          return;
        }
      }
    }
    render(scene, camera);
  }
  function exploreAnimation(target: any) {
    const { x, y, z } = target.model.position;
    orbitControls.enabled = false;
    gsap.to(orbitControls.target, {
      x: x,
      y: y + 50,
      z: z,
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: function () {
        orbitControls.update();
      },
      onComplete: () => {
        orbitControls.enabled = true;
      },
    });
    gsap.to(camera.position, {
      x: x,
      y: y + 50,
      z: z + 40,
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: function () {
        orbitControls.update();
      },
      onComplete: () => {
        orbitControls.enabled = true;
      },
    });
  }

  // GENERATE OBJECT
  async function getModelSrc() {
    await fetchBuilding();
    modelSrc.forEach((item: any) => {
      loadModel(item);
    });
  }
  function loadModel(src: any) {
    const loader = new GLTFLoader();
    loader.load(
      src.object3D,
      function (gltf: any) {
        const model = gltf.scene;
        models.value.push({
          data: src.data,
          model: model,
        });
        model.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        model.position.set(
          src.data.position.x,
          src.data.position.y,
          src.data.position.z
        );
        model.rotateY(src.data.rotate * (Math.PI / 180));
        scene.add(model);
      },
      undefined,
      function (error: any) {
        console.error(error);
      }
    );
  }
  function simulateHouses() {
    housesPosition.forEach((e: any) => {
      const { x, y, z } = e;
      const geometry = new THREE.BoxGeometry(30, 20 + 40 * Math.random(), 40);
      const material = new THREE.MeshStandardMaterial({ color: 0xd5d5d5 });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, z);
      if (e.r) {
        cube.rotateY(e.r * (Math.PI / 180));
      } else {
        cube.rotateY(135 * (Math.PI / 180));
      }
      cube.castShadow = true;
      cube.receiveShadow = true;
      scene.add(cube);
    });
  }
  async function fetchBuilding() {
    const params = {
      filter: [],
    };
    const res = await fetchBuildings(params);
    if (res) {
      modelSrc = res.data;
    }
  }

  // BUILDING DETAIL
  function handleCloseDetail() {
    selectedModel.value = null;
    scene.traverse((e: any) => {
      if (e.isMesh) e.material.color.set(0xd5d5d5);
    });
    resetCamera();
  }

  // OPTION
  function toggleAxis() {
    axisDisplay.value = !axisDisplay.value;
    if (axisDisplay.value) {
      scene.add(axesHelper);
    } else {
      scene.remove(axesHelper);
    }
  }
  function toggleGrid() {
    gridDisplay.value = !gridDisplay.value;
    ground.material.wireframe = gridDisplay.value;
  }
  function toggleWireframe() {
    wireframeDisplay.value = !wireframeDisplay.value;

    models.value.forEach((e: any) => {
      e.model.traverse((node: any) => {
        if (!node.geometry) return;
        node.material.wireframe = wireframeDisplay.value;
      });
    });
  }
  function toggleLight() {
    lightDirectionDisplay.value = !lightDirectionDisplay.value;
  }
  function toggleLightHelper() {
    lightHelperDisplay.value = !lightHelperDisplay.value;
    if (lightHelperDisplay.value) {
      scene.add(lightHelper);
      scene.add(shadowHelper);
    } else {
      scene.remove(lightHelper);
      scene.remove(shadowHelper);
    }
  }
  function resetCamera() {
    orbitControls.enabled = false;
    gsap.to(orbitControls.target, {
      ...cameraDefaultTarget,
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: function () {
        orbitControls.update();
      },
      onComplete: () => {
        orbitControls.enabled = true;
      },
    });
    gsap.to(camera.position, {
      ...cameraDefaultPos,
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: function () {
        orbitControls.update();
      },
      onComplete: () => {
        orbitControls.enabled = true;
      },
    });
  }
  function returnToHomepage() {
    window.open(
      router.resolve({
        name: "index",
      }).href,
      "_self"
    );
  }
  function handleViewFloor(floor: string) {
    window.open(
      router.resolve({
        name: "showroom",
        query: {
          floor: floor,
        },
      }).href,
      "_self"
    );
  }
</script>

<style>
  .floor-list::-webkit-scrollbar {
    height: 4px;
    width: 4px;
  }

  .floor-list::-webkit-scrollbar-track {
    background: #25252599;
    border-radius: 12px;
  }

  .floor-list::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background: rgb(75, 75, 75);
  }
</style>
