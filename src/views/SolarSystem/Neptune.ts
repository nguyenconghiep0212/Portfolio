import * as THREE from "three";

// ADDING EARTH
export const neptuneSystemObj = new THREE.Object3D();

const neptuneTexture = new THREE.TextureLoader().load(
  "src/assets/images/neptune.jpg"
);
export const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture,
  })
);
neptune.position.set(170, 0, 0);

neptuneSystemObj.add(neptune);
