import * as THREE from "three";

// ADDING EARTH
export const jupiterSystemObj = new THREE.Object3D();

const jupiterTexture = new THREE.TextureLoader().load(
  "src/assets/images/jupiter.jpg"
);
export const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);
jupiter.position.set(110, 0, 0);

jupiterSystemObj.add(jupiter);
