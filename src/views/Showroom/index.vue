<template>
  <div class="w-full h-full">
    <div ref="el" class="w-full h-full"></div>
  </div>
</template>

<script lang="ts" setup>
  import * as THREE from "three";
    import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  // import { Icon } from "/@/uikits/Icon";
  import { onMounted, ref } from "vue";
  import * as CANNON from "cannon-es";
  import CannonDebugger from "cannon-es-debugger";
import {FirstPersonCamera} from './firstPersonCamera'
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
  // const axesHelper = new THREE.AxesHelper(1_000);
  // const gridHelper = new THREE.GridHelper(100, 100);
  // scene.add(gridHelper, axesHelper);

  const ambientLight = new THREE.AmbientLight( 0xffffff, 0.2);
const pointLight = new THREE.PointLight(
      0xffffff,
      5,
      50,
      0
    );
    pointLight.position.set(0,20,0)
    //Set up shadow properties for the light
    pointLight.castShadow = true; // default false

pointLight.shadow.mapSize.width = 512; // default
pointLight.shadow.mapSize.height = 512; // default
pointLight.shadow.camera.near = 0.5; // default
pointLight.shadow.camera.far = 500; // default
    const lightHelper = new THREE.PointLightHelper(pointLight)
  scene.add(ambientLight,pointLight,lightHelper);
  const groundGeo = new THREE.PlaneGeometry(1_000, 1_000, 32, 32);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0xd5d5d5,
    side: THREE.DoubleSide,
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.receiveShadow = true
  ground.rotateX(Math.PI / 2);
  scene.add(ground);

const boxMesh = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial({
      color: 0xff0000,
    })
)
boxMesh.castShadow = true
  const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 16),
    new THREE.MeshStandardMaterial({
      color: 0xff0000,
    })
  );
  sphereMesh.castShadow =true
  scene.add(sphereMesh,boxMesh);

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
    // loadModel()
    animate();
  });
  function render(scene: any, camera: any) {
    renderer.render(scene, camera);
  }
  function animate() {
    physicWorld.fixedStep();
    // cannonDebugger.update();
    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);
     boxMesh.position.copy(boxBody.position);
    boxMesh.quaternion.copy(boxBody.quaternion);
    requestAnimationFrame(animate);
    orbitControls.update();
    render(scene, camera);
  }

  // LOAD ROOM
    function loadModel() {
    const loader = new GLTFLoader();
    loader.load(
      'src/assets/3DModels/room.glb',
      function (gltf: any) {
        const model = gltf.scene; 
         model.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        }); 
        model.scale.set(0.3,0.3,0.3)
        scene.add(model);
      }, 
      function (error: any) {
        console.error(error);
      }
    );
  }
</script>
