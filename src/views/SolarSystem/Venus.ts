import * as THREE from "three";

// ADDING EARTH
export const venusSystemObj = new THREE.Object3D();

const venusTexture = new THREE.TextureLoader().load(
  "src/assets/images/venus_atmosphere.jpg"
);
export const venus = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
  })
);
venus.position.set(50, 0, 0);

venusSystemObj.add(venus);
