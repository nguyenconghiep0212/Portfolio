<template>
  <div class="rounded w-full h-full bg-[#39393c3a] relative">
    <div class="absolute top-1 left-1 flex flex-col space-y-1">
      <div class="flex justify-start w-min">
        <n-button
          class="opacity-60 bg-black"
          secondary
          @click="returnToHomepage"
        >
          <Icon icon="material-symbols:arrow-back" />
        </n-button>
      </div>
      <div
        v-if="selectedModel"
        class="bg-opacity-50 bg-black p-2 rounded w-[30vw] h-[60vh] flex justify-start"
      >
        <div class="flex justify-between w-full h-min items-center">
          <div class="tracking-widest text-lg text-bold opacity-60">
            {{ selectedModel.raw.name }}
          </div>
          <div>
            <Icon
              class="cursor-pointer opacity-60"
              icon="material-symbols:close-rounded"
              @click="handleCloseDetail"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="absolute top-2 left-1/2 -translate-x-1/2">
      <div class="tracking-widest text-lg text-bold opacity-60">TOWN MODEL</div>
    </div>
    <div class="absolute top-1 right-1">
      <n-button-group vertical>
        <n-button class="opacity-60 bg-black" secondary @click="toggleAxis">
          <Icon
            :class="axisDisplay ? 'text-red-400' : 'text-white'"
            icon="lucide:axis-3d"
          />
        </n-button>
        <n-button class="opacity-60 bg-black" secondary @click="toggleGrid">
          <Icon
            :class="gridDisplay ? 'text-red-400' : 'text-white'"
            icon="teenyicons:view-grid-outline"
          />
        </n-button>
        <n-button
          class="opacity-60 bg-black"
          secondary
          @click="toggleWireframe"
        >
          <Icon
            :class="wireframeDisplay ? 'text-red-400' : 'text-white'"
            icon="iconoir:xray-view"
          />
        </n-button>
        <n-button class="opacity-60 bg-black" secondary @click="toggleLight">
          <Icon
            :class="lightDirectionDisplay ? 'text-red-400' : 'text-white'"
            icon="solar:sun-bold-duotone"
          />
        </n-button>
        <n-button
          class="opacity-60 bg-black"
          secondary
          @click="toggleLightHelper"
        >
          <Icon
            :class="lightHelperDisplay ? 'text-red-400' : 'text-white'"
            icon="ph:headlights-bold"
          />
        </n-button>
      </n-button-group>
      <Icon icon="" />
    </div>
    <div ref="el" class="w-full h-full"></div>
  </div>
</template>

<script lang="ts" setup>
  import * as THREE from "three";
  import { onMounted, ref } from "vue";
  import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  import { Icon } from "/@/uikits/Icon";
  import { useRouter } from "vue-router";
  import { gsap } from "gsap";

  const router = useRouter();
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const el = ref<any>(null);
  const scene = new THREE.Scene();
  let camera: any;
  let orbitControls: any;
  const gridDisplay = ref(false);
  const axisDisplay = ref(false);
  const wireframeDisplay = ref(false);
  const lightHelperDisplay = ref(false);
  const lightDirectionDisplay = ref(false);
  const axesHelper = new THREE.AxesHelper(1_000);

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
    "src/assets/images/city-map-background.jpg"
  );
  const groundGeo = new THREE.PlaneGeometry(1_000, 1_000, 32, 32);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
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
  directionalLight.position.set(200, 400, 100);
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

  onMounted(() => {
    scene.background = new THREE.Color("black");
    if (el.value) {
      const { width, height } = el.value.getBoundingClientRect();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1_000_000);
      camera.position.setZ(300);
      camera.position.setY(400);
      camera.position.setX(200);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      el.value.appendChild(renderer.domElement);
      orbitControls = new OrbitControls(camera, renderer.domElement);
      orbitControls.enableDamping = true;
      orbitControls.enablePan = false;
      orbitControls.minDistance = 100;
      orbitControls.maxDistance = 400;
      orbitControls.minPolarAngle = 0.5;
      orbitControls.maxPolarAngle = 1.5;
    }
    renderer.domElement.addEventListener("click", onMouseOverObject, false);
    animate();
    getModelSrc();
    // simulateHouses();
  });
  function render(scene: any, camera: any) {
    renderer.render(scene, camera);
  }
  function animate() {
    requestAnimationFrame(animate);
    orbitControls.update();
    render(scene, camera);
  }

  // MOUSE EVENT
  function onMouseOverObject(event: MouseEvent) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(scene, true);
    if (intersects.length > 0) {
      const object = intersects[0].object;
      if (ground.id != object.id) {
        scene.traverse((e: any) => {
          if (e.isMesh) e.material.color.set(0xffffff);
        });
        object.material.color.set(0xff9b9b);
        selectedModel.value = models.value.find((e: any) =>
          e.model.children.some((f: any) => f.id === object.id)
        );
        exploreAnimation(selectedModel.value);
      }
    }
    render(scene, camera);
  }
  function exploreAnimation(target: any) {
    const { x, y, z } = target.model.position;
    gsap.to(camera.position, {
      x: x + 20,
      y: y + 100,
      z: z + 20,
      duration: 2,
      ease: "power3.inOut",
      onComplete: () => {
        console.log("complete");
      },
    });
  }

  // GENERATE OBJECT
  function getModelSrc() {
    // call api action here
    const modelSrc = [
      {
        raw: {
          name: "Office building 2",
          key: "office-building-2",
          rotate: 45,
          position: {
            x: 115,
            y: 0,
            z: 145,
          },
        },
        object3D: "src/assets/3DModels/building_01.glb",
      },
      {
        raw: {
          name: "Office building 1",
          key: "office-building-1",
          rotate: 45,
          position: {
            x: 80,
            y: 0,
            z: 110,
          },
        },
        object3D: "src/assets/3DModels/building_02.glb",
      },
      {
        raw: {
          name: "Main building",
          key: "main-building",
          rotate: 315,
          position: {
            x: 60,
            y: 0,
            z: 200,
          },
        },
        object3D: "src/assets/3DModels/building_03.glb",
      },
      {
        raw: {
          name: "Resident tower 1",
          key: "resident-tower-1",
          rotate: 45,
          position: {
            x: -60,
            y: 0,
            z: -35,
          },
        },
        object3D: "src/assets/3DModels/building_04.glb",
      },
      {
        raw: {
          name: "Resident tower 2",
          key: "resident-tower-2",
          rotate: 135,
          position: {
            x: -125,
            y: 0,
            z: 60,
          },
        },
        object3D: "src/assets/3DModels/building_05.glb",
      },
    ];
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

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.x -= center.x * 0.03;

        models.value.push({
          raw: src.raw,
          model: model,
        });
        model.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        model.position.set(
          src.raw.position.x,
          src.raw.position.y,
          src.raw.position.z
        );
        model.rotateY(src.raw.rotate * (Math.PI / 180));
        scene.add(model);
      },
      undefined,
      function (error: any) {
        console.error(error);
      }
    );
  }
  // function simulateHouses() {
  //   const geometry = new THREE.BoxGeometry(30, 40, 40);
  //   const material = new THREE.MeshStandardMaterial({ color: 0xff00ff });
  //   const cube = new THREE.Mesh(geometry, material);
  //   cube.position.set(-140, 0, 70);
  //   cube.rotateY(135 * (Math.PI / 180));
  //   cube.castShadow = true;
  //   cube.receiveShadow = true;
  //   scene.add(cube);
  // }

  // BUILDING DETAIL
  function handleCloseDetail() {
    selectedModel.value = null;
    scene.traverse((e: any) => {
      if (e.isMesh) e.material.color.set(0xffffff);
    });
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
  function returnToHomepage() {
    window.open(
      router.resolve({
        name: "index",
      }).href,
      "_self"
    );
  }
</script>
