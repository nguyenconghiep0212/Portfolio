import * as THREE from "three";
import createLineLoopWithMesh from "/@/utils/helper/orbitalPath";
// ADDING EARTH
export const earthSystemObj = new THREE.Object3D();
export const earthSystem = new THREE.Object3D();
earthSystem.position.set(70, 0, 0);

const earthTexture = new THREE.TextureLoader().load(
  "src/assets/images/earth.jpg"
);
const earthNormalTexture = new THREE.TextureLoader().load(
  "src/assets/images/earth_normal_map.jpg"
);
export const earth = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthNormalTexture,
  })
);

// ADDING THE MOON AND ORBIT
const moonTexture = new THREE.TextureLoader().load(
  "src/assets/images/moon.jpg"
);
const moonNormalTexture = new THREE.TextureLoader().load(
  "src/assets/images/moon_normal_map.jpg"
);
export const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormalTexture,
  })
);
moon.position.set(6, 0, 0);
const pointLightMoon = new THREE.PointLight(0xffffff, 0.2, 500, 0);
moon.add(pointLightMoon);

export const earthPath = createLineLoopWithMesh(70, 0xffffff, 3);
const moonPath = createLineLoopWithMesh(6, 0xffffff, 3);

earthSystem.add(earth, moon, moonPath);
earthSystemObj.add(earthSystem);
