<template>
  <div class="w-full h-full bg-[#39393c3a] relative">
    <div
      ref="menu"
      class="w-full h-full absolute flex justify-center items-center top-0 right-0 bg-[#000000bf]"
    >
      <n-button type="primary" @click="onClickMenu">Click to play</n-button>
    </div>
    <div ref="el" class="w-full h-full"></div>
  </div>
</template>

<script lang="ts" setup>
  import * as THREE from "three";
  import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
  import { onMounted, ref } from "vue";
  import * as CANNON from "cannon-es";
  import CannonDebugger from "cannon-es-debugger";
  import { PointerLockControlsCannon } from "./PointerLockControlCamera";
  import Stats from "three/addons/libs/stats.module.js";

  const menu = ref(null);
  const el = ref<any>(null);
  const scene = new THREE.Scene();
  const stats = new Stats();
  document.body.appendChild(stats.dom);
  let camera: any;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: false,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // const axesHelper = new THREE.AxesHelper(1_000);
  // const gridHelper = new THREE.GridHelper(100, 100);
  // scene.add(gridHelper, axesHelper);
  // const uiCamera_ = new THREE.OrthographicCamera(
  //   -1,
  //   1,
  //   1 * (1920 / 1080),
  //   -1 * (1920 / 1080),
  //   1,
  //   1000
  // );
  // const uiScene_ = new THREE.Scene();

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  const spotLight = new THREE.SpotLight(0xffffff, 200, 50, Math.PI / 4, 0);
  spotLight.position.set(0, 20, 0);
  //Set up shadow properties for the light
  spotLight.castShadow = true; // default false
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;
  spotLight.shadow.camera.near = 10; // default
  spotLight.shadow.camera.far = 100; // default
  const lightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(ambientLight, spotLight, lightHelper);
  const groundGeo = new THREE.PlaneGeometry(1_000, 1_000, 32, 32);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0xd5d5d5,
    side: THREE.DoubleSide,
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.receiveShadow = true;
  ground.rotateX(Math.PI / 2);
  scene.add(ground);

  const boxMesh = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial({
      color: 0xff0000,
    })
  );
  boxMesh.castShadow = true;
  const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 16),
    new THREE.MeshStandardMaterial({
      color: 0x00ff00,
    })
  );
  sphereMesh.castShadow = true;
  scene.add(sphereMesh, boxMesh);

  // PHYSIC
  const physicWorld = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
  });
  const groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC, // can also be achieved by setting the mass to 0
    shape: new CANNON.Plane(),
  });
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  physicWorld.addBody(groundBody);
  // BODY
  const sphereBody = new CANNON.Body({
    mass: 5,
    shape: new CANNON.Sphere(1),
  });
  sphereBody.position.set(0, 10, 0);
  const boxBody = new CANNON.Body({
    mass: 7,
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
  });
  boxBody.position.set(1, 15, 1);
  physicWorld.addBody(sphereBody);
  physicWorld.addBody(boxBody);
  // FIRST PERSON CAMERA
  const timeStep = 1 / 60;
  let lastCallTime = performance.now();
  const cameraShape = new CANNON.Sphere(1.3);
  const cameraBody = new CANNON.Body({
    mass: 40,
    material: new CANNON.Material("physics"),
  });
  cameraBody.addShape(cameraShape);
  cameraBody.position.set(10, 5, 10);
  cameraBody.linearDamping = 0.9;
  physicWorld.addBody(cameraBody);
  let fps_controls: any;
  function initPointerLock(camera: THREE.PerspectiveCamera) {
    fps_controls = new PointerLockControlsCannon(camera, cameraBody);
    scene.add(fps_controls.getObject());

    fps_controls.addEventListener("lock", () => {
      fps_controls.enabled = true;
      console.log(fps_controls.enabled, "fps_controls.enabled");
      menu.value.classList.add("hidden");
    });

    fps_controls.addEventListener("unlock", () => {
      fps_controls.enabled = false;
      menu.value.classList.remove("hidden");
    });
  }

  // CANNON DEBUGGER
  const cannonDebugger = new CannonDebugger(scene, physicWorld, {});

  onMounted(async () => {
    scene.background = new THREE.Color("black");

    if (el.value) {
      const { width, height } = el.value.getBoundingClientRect();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1_000_000);
      // camera.position.set(20, 0, 20);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      el.value.appendChild(renderer.domElement);
    }
    // loadModel()
    // initCrosshair();
    initPointerLock(camera);
    animate();
  });
  function render(scene: any, camera: any) {
    renderer.render(scene, camera);
  }
  function animate() {
    // physicWorld.fixedStep();
    // cannonDebugger.update();

    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);
    boxMesh.position.copy(boxBody.position);
    boxMesh.quaternion.copy(boxBody.quaternion);
    requestAnimationFrame(animate);

    // FPS CAMERA
    if (fps_controls.enabled) {
      const time = performance.now() / 1000;
      const dt = time - lastCallTime;
      lastCallTime = time;
      physicWorld.step(timeStep, dt);
      fps_controls.update(dt);
    }

    // orbitControls.update();
    render(scene, camera);
    // render(uiScene_, uiCamera_);
    stats.update();
  }

  function initCrosshair() {
    const loader = new THREE.TextureLoader();
    const crosshair = loader.load(
      "https://res.cloudinary.com/dc7jd2eeu/image/upload/v1715198485/Misc/myzpina0xcrex3du0acq.png"
    );
    crosshair.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: crosshair,
        color: 0xffffff,
        fog: false,
        depthTest: false,
        depthWrite: false,
      })
    );
    sprite.scale.set(0.15, 0.15 * camera.aspect, 1);
    sprite.position.set(0, 0, -10);

    // uiScene_.add(sprite);
  }

  // LOAD ROOM
  function loadModel() {
    const loader = new GLTFLoader();
    loader.load(
      "src/assets/3DModels/room.glb",
      function (gltf: any) {
        const model = gltf.scene;
        model.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        model.scale.set(0.3, 0.3, 0.3);
        scene.add(model);
      },
      function (error: any) {
        console.error(error);
      }
    );
  }

  // MENU CONTROL
  function onClickMenu() {
    fps_controls.lock();
  }
</script>
