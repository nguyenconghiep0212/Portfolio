<template>
  <div class="flex flex-col h-full">
    <div ref="el" class="flex-1 w-full"></div>
    <div class="pallete">
      <div
        v-for="(item, index) in planetArr"
        :key="index"
        :class="item"
        @mouseover="handleHover(item)"
        @mouseout="handleLeave(item)"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* Planets by notchris */
import { onMounted, ref } from "vue";
import * as THREE from "three";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import gsap from "gsap";

let camera: {
  position: {
    set: (arg0: number, arg1: number, arg2: number) => void;
    x: number;
    y: number;
  };
  aspect: number;
  updateProjectionMatrix: () => void;
};
let controls: { enabled: boolean };
let widthRender: number;
let heightRender: number;
let activePlanet: string | null;
const planets = {
  mercury: {
    size: 1,
    orbitRadius: 50,
    speed: 100,
    color: "#C2D0FF",
    distance: "43.291 million mi",
    mesh: null,
  },
  venus: {
    size: 2,
    orbitRadius: 60,
    speed: 73,
    color: "#FF9900",
    distance: "66.822 million mi",
    mesh: null,
  },
  earth: {
    size: 1.5,
    orbitRadius: 70,
    speed: 62,
    color: "#00A3FF",
    distance: "94.044 million mi",
    mesh: null,
  },
  mars: {
    size: 3,
    orbitRadius: 80,
    speed: 50,
    color: "#FF5C00",
    distance: "131.56 million mi",
    mesh: null,
  },
  jupiter: {
    size: 8,
    orbitRadius: 90,
    speed: 27,
    color: "#E59700",
    distance: "460.96 million mi",
    mesh: null,
  },
  saturn: {
    size: 6,
    orbitRadius: 120,
    speed: 20,
    color: "#FFCF72",
    distance: "915.96 million mi",
    mesh: null,
  },
  uranus: {
    size: 4,
    orbitRadius: 160,
    speed: 14,
    color: "#61D9FF",
    distance: "1.8297 billion mi",
    mesh: null,
  },
  neptune: {
    size: 4,
    orbitRadius: 200,
    speed: 11,
    color: "#0047FF",
    distance: "2.78 billion mi",
    mesh: null,
  },
};
const labelRenderer = new CSS2DRenderer();
const clock = new THREE.Clock();
const mainObj = new THREE.Object3D();
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

const scene = new THREE.Scene();
const el = ref(null);
const size = new THREE.Vector3();
const center = new THREE.Vector3();
const box = new THREE.Box3();

const planetArr = [
  "sun",
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
];

onMounted(() => {
  const { width, height } = el.value.getBoundingClientRect();
  widthRender = width;
  heightRender = height;
  camera = new THREE.PerspectiveCamera(45, widthRender / heightRender, 1, 1000);
  controls = new OrbitControls(camera, renderer.domElement);
console.log('on mounted')
  init();
  animate();
});
function handleHover(planet: string) {
  activePlanet = planet;
  gsap.to(mainObj.rotation, {
    duration: 0.3,
    x: Math.PI / 2,
    ease: "none",
    paused: false,
  });
  gsap.to(mainObj.position, {
    duration: 0.3,
    z: 200,
    ease: "none",
    paused: false,
  });

  const mesh = scene.getObjectByName(planet);
  mesh.children[0].visible = true;
  activePlanet = mesh;
}

function handleLeave(planet: string) {
  gsap.to(mainObj.rotation, {
    duration: 0.3,
    x: 0.1,
    ease: "none",
    paused: false,
  });
  gsap.to(mainObj.position, {
    duration: 0.3,
    z: 0,
    ease: "none",
    paused: false,
  });
  const mesh = scene.getObjectByName(planet);
  mesh.children[0].visible = false;
  activePlanet = null;
}

function fitCameraToSelection(
  camera: {
    fov: number;
    aspect: number;
    position: { copy: (arg0: any) => string };
    near: number;
    far: number;
    updateProjectionMatrix: () => void;
  },
  controls: {
    target: {
      clone: () => {
        (): any;
        new (): any;
        sub: {
          (arg0: any): {
            (): any;
            new (): any;
            normalize: {
              (): {
                (): any;
                new (): any;
                multiplyScalar: { (arg0: number): any; new (): any };
              };
              new (): any;
            };
          };
          new (): any;
        };
      };
      copy: (arg0: any) => void;
    };
    maxDistance: number;
    update: () => void;
  },
  selection: any[],
  fitOffset: number
) {
  box.makeEmpty();
  for (const object of selection) {
    box.expandByObject(object);
  }

  box.getSize(size);
  box.getCenter(center);

  const maxSize = Math.max(size.x, size.y, size.z);
  const fitHeightDistance =
    maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);

  const direction = controls.target
    .clone()
    .sub(camera.position)
    .normalize()
    .multiplyScalar(distance);

  controls.maxDistance = distance * 10;

  controls.target.copy(center);

  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();

  camera.position.copy(controls.target).sub(direction);
  controls.update();
}

function init() {
  // renderer

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(widthRender, heightRender);
  el.value.appendChild(renderer.domElement);

  labelRenderer.setSize(widthRender, heightRender);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  el.value.appendChild(labelRenderer.domElement);

  // scene
  scene.background = new THREE.Color("#F6F1E5");

  camera.position.set(0, 0, 1);

  controls.enabled = false;
  scene.add(new THREE.AmbientLight(0x999999, 1.0));

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(40, 32, 16),
    new THREE.MeshBasicMaterial({ color: "#FFE600" })
  );

  sun.name = "sun";
  const div = document.createElement("div");
  div.className = "label";
  div.innerHTML = `
					<div class="planet-title">SUN</div>
			`;

  const label = new CSS2DObject(div);
  label.position.copy(sun.position);
  label.visible = false;
  sun.add(label);

  label.layers.set(0);
  sun.add(new THREE.PointLight(0xdddddd, 1.0, 400, 0.7));

  Object.entries(planets).forEach((p) => {
    const name = p[0];
    const { size, orbitRadius, color, distance } = p[1];
    console.log(name, size, orbitRadius);

    let pts = new THREE.Path()
      .absarc(0, 0, orbitRadius, 0, Math.PI * 2)
      .getPoints(90);

    let g = new THREE.BufferGeometry().setFromPoints(pts);
    g.rotateX(Math.PI * 0.5);
    let m = new THREE.LineBasicMaterial({
      color: "#000000",
      transparent: true,
      opacity: 0.25,
    });
    let o = new THREE.Line(g, m);

    scene.add(o);
    mainObj.add(o);

    let pg = new THREE.SphereGeometry(size, 10, 5);
    let pm = new THREE.MeshToonMaterial({ color: color });
    let pmesh = new THREE.Mesh(pg, pm);
    pmesh.name = name;
    scene.add(pmesh);
    o.add(pmesh);

    planets[name].mesh = pmesh;
    planets[name].line = o;

    const div = document.createElement("div");
    div.className = "label";
    div.innerHTML = `
					<div class="planet-title">${name}</div>
					<div class="planet-distance">${distance}</div>
				`;

    const label = new CSS2DObject(div);
    label.position.copy(planets[name].mesh.position);
    label.visible = true;
    planets[name].mesh.add(label);
    planets[name].label = label;
    label.layers.set(0);
  });

  mainObj.add(sun);

  scene.add(mainObj);

  mainObj.rotation.x = 0.1;

  window.addEventListener("resize", () => {
    const { widthRender, heightRender } = el.value.getBoundingClientRect();
    camera.aspect = widthRender / heightRender;
    camera.updateProjectionMatrix();
    fitCameraToSelection(camera, controls, [planets["neptune"].line], 0.6);
    renderer.setSize(widthRender, heightRender);
    labelRenderer.setSize(widthRender, heightRender);
  });

  fitCameraToSelection(camera, controls, [planets["neptune"].line], 0.6);
}

function render() {
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  let t = clock.getElapsedTime() / 50;

  Object.entries(planets).forEach((p) => {
    const { orbitRadius, mesh, speed } = p[1];
    if (mesh) {
      mesh.position
        .set(Math.cos(t * speed), 0, -Math.sin(t * speed))
        .multiplyScalar(orbitRadius);
      mesh.rotation.y = t * speed - Math.PI * 0.5;
      mesh.rotation.z = Math.PI * 0.5;
    }
  });
  if (activePlanet) {
    camera.position.x = activePlanet.position.x;
    camera.position.y = -activePlanet.position.z;
  } else {
    camera.position.x = 0;
    camera.position.y = 0;
  }
  render();
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
  text-rendering: optimizeLegibility;
  font-kerning: auto;
}

:deep(.label) {
  margin-top: -1em;
  text-align: center;
}

:deep(.label .planet-distance:after) {
  content: "";
  font-size: 0.1em;
  position: absolute;
  top: 32px;
  left: 50%;
  width: 1px;
  height: 16px;
  background: rgba(0, 0, 0, 0.5);
}

.planets {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.planet-title {
  font-family: "Arial", sans-serif;
  font-size: 0.6em;
  font-weight: 600;
  display: block;
  width: 100%;
  text-transform: uppercase;
  padding-bottom: 0.3em;
}

:deep(.planet-distance) {
  font-family: "Arial", sans-serif;
  font-size: 0.5em;
  font-weight: 400;
  display: block;
  width: 100%;
}

.pallete {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  min-height: 50px;
  padding: 0.5em 0;
}

.pallete div {
  width: 30px;
  height: 30px;
  margin-right: 1em;
  opacity: 0.5;
  border-radius: 30px;
  cursor: pointer;
}

.pallete div:hover {
  border: 2px solid rgba(0, 0, 0, 0.5);
  opacity: 1;
}

.pallete div:last-child {
  margin-right: 0 !important;
}

.pallete {
  & .sun {
    background: #ffe600;
  }
  & .mercury {
    background: #c2d0ff;
  }
  & .venus {
    background: #ff9900;
  }
  & .earth {
    background: #00a3ff;
  }
  & .mars {
    background: #ff5c00;
  }
  & .jupiter {
    background: #e59700;
  }
  & .saturn {
    background: #ffcf72;
  }
  & .uranus {
    background: #61d9ff;
  }
  & .neptune {
    background: #0047ff;
  }
}
</style>