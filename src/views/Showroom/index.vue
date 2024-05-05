<template>
  <div class="w-full h-full">
    <div ref="el" class="w-full h-full"></div>
  </div>
</template>

<script lang="ts" setup>
  import * as THREE from "three";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  // import { Icon } from "/@/uikits/Icon";
  import { onMounted, ref } from "vue";
  import * as CANNON from "cannon-es";
  import CannonDebugger from "cannon-es-debugger";

  const el = ref<any>(null);
  const scene = new THREE.Scene();
  let camera: any;
  let orbitControls: any;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: false,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const axesHelper = new THREE.AxesHelper(1_000);
  const gridHelper = new THREE.GridHelper(100, 100);
  scene.add(gridHelper, axesHelper);

  const groundGeo = new THREE.PlaneGeometry(1_000, 1_000, 32, 32);
  const groundMat = new THREE.MeshBasicMaterial({
    color: 0xd5d5d5,
    side: THREE.DoubleSide,
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotateX(Math.PI / 2);
  scene.add(ground);

  const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 16),
    new THREE.MeshBasicMaterial({
      color: 0xff0000,
    })
  );
  scene.add(sphereMesh);

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

  // CANNON DEBUGGER
  const cannonDebugger = new CannonDebugger(scene, physicWorld, {});

  onMounted(async () => {
    scene.background = new THREE.Color("black");

    if (el.value) {
      const { width, height } = el.value.getBoundingClientRect();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1_000_000);
      camera.position.setZ(20);
      camera.position.setY(20);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      el.value.appendChild(renderer.domElement);
      orbitControls = new OrbitControls(camera, renderer.domElement);
      orbitControls.enableDamping = true;
    }
    animate();
  });
  function render(scene: any, camera: any) {
    renderer.render(scene, camera);
  }
  function animate() {
    physicWorld.fixedStep();
    cannonDebugger.update();
    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);
    requestAnimationFrame(animate);
    orbitControls.update();
    render(scene, camera);
  }
</script>
