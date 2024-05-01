<template>
  <div class="rounded w-full h-full bg-[#39393c3a] relative">
    <div class="absolute top-1 left-1">
      <n-button class="opacity-60 bg-black" secondary @click="returnToHomepage">
        <Icon icon="material-symbols:arrow-back" />
      </n-button>
    </div>
    <div class="absolute top-2 left-1/2 -translate-x-1/2">
      <div class="tracking-widest text-lg text-bold opacity-60">
        BUILDING MODEL
      </div>
    </div>
    <div class="absolute top-1 right-1">
      <n-button-group vertical>
        <n-button class="opacity-60 bg-black" secondary @click="toggleAxis">
          <Icon icon="lucide:axis-3d" />
        </n-button>
        <n-button class="opacity-60 bg-black" secondary @click="toggleGrid">
          <Icon icon="teenyicons:view-grid-outline" />
        </n-button>
        <n-button
          class="opacity-60 bg-black"
          secondary
          @click="toggleWireframe"
        >
          <Icon icon="iconoir:xray-view" />
        </n-button>
        <n-button class="opacity-60 bg-black" secondary @click="toggleLight">
          <Icon icon="solar:sun-bold-duotone" />
        </n-button>
        <n-button
          class="opacity-60 bg-black"
          secondary
          @click="toggleLightHelper"
        >
          <Icon icon="ph:headlights-bold" />
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

  const router = useRouter();

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
    color: 0xe6e6e6,
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
  directionalLight.position.set(200, 400, 400);
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
  // const shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
  // scene.add(shadowHelper);

  onMounted(() => {
    scene.background = new THREE.Color("black");
    if (el.value) {
      const { width, height } = el.value.getBoundingClientRect();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1_000_000);
      camera.position.setZ(100);
      camera.position.setY(60);
      camera.position.setX(60);
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
  }

  function getModelSrc() {
    // call api action here
    const modelSrc = [
      {
        raw: {
          name: "Main Tower",
          key: "main-tower",
          rotate: 45,
          position: {
            x: 120,
            y: 0,
            z: 150,
          },
        },
        object3D: "src/assets/3DModels/building_01.gltf",
      },
      {
        raw: {
          name: "Office building 1",
          key: "office-building-1",
          rotate: 140,
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
        object3D: "src/assets/3DModels/building_02.gltf",
      },
      {
        raw: {
          name: "Office building 2",
          key: "office-building-2",
          rotate: 60,
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
        object3D: "src/assets/3DModels/building_03.gltf",
      },
      {
        raw: {
          name: "Resident tower 1",
          key: "resident-tower-1",
          rotate: 150,
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
        object3D: "src/assets/3DModels/building_04.gltf",
      },
      {
        raw: {
          name: "Resident tower 2",
          key: "resident-tower-2",
          rotate: 230,
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
        object3D: "src/assets/3DModels/building_05.gltf",
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
        model.rotateX(Math.PI / 2);
        model.scale.set(0.03, 0.03, 0.03);
        scene.add(model);
      },
      undefined,
      function (error: any) {
        console.error(error);
      }
    );
  }

  function simulateHouses() {
    const geometry = new THREE.BoxGeometry(30, 40, 40);
    const material = new THREE.MeshStandardMaterial({ color: 0xff00ff });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(-140, 0, 70);
    cube.rotateY(135 * (Math.PI / 180));
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);
  }

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
    } else {
      scene.remove(lightHelper);
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
