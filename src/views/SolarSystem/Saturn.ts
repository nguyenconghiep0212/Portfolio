import * as THREE from "three";

// ADDING EARTH
export const saturnSystemObj = new THREE.Object3D();
export const saturnSystem = new THREE.Object3D();

const saturnTexture = new THREE.TextureLoader().load(
  "src/assets/images/saturn.jpg"
);
const ringTexture = new THREE.TextureLoader().load(
  "src/assets/images/saturn_ring.jpg"
);
export const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: saturnTexture,
  })
);

saturnSystem.position.set(130, 0, 0);
const ringGeo = new THREE.RingGeometry(20, 30, 32);
const ringMat = new THREE.MeshStandardMaterial({
  map: ringTexture,
  side: THREE.DoubleSide,
});
const ring = new THREE.Mesh(ringGeo, ringMat);
ring.rotateY(-0.5 * Math.PI);
ring.rotateX(-0.4 * Math.PI);

saturnSystem.add(saturn, ring);
saturnSystemObj.add(saturnSystem);
