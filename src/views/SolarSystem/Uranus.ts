import * as THREE from "three";

// ADDING EARTH
export const uranusSystemObj = new THREE.Object3D();

export const uranusSystem = new THREE.Object3D();
uranusSystem.position.set(150, 0, 0);

const uranusTexture = new THREE.TextureLoader().load(
  "src/assets/images/uranus.jpg"
);

const ringTexture = new THREE.TextureLoader().load(
  "src/assets/images/uranus_ring.jpg"
);

const ringGeo = new THREE.RingGeometry(20, 30, 32);
const ringMat = new THREE.MeshStandardMaterial({
  map: ringTexture,
  side: THREE.DoubleSide,
});
const ring = new THREE.Mesh(ringGeo, ringMat);
ring.rotateY(-0.5 * Math.PI);
ring.rotateX(-0.4 * Math.PI);

export const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: uranusTexture,
  })
);

uranusSystem.add(uranus, ring);
uranusSystemObj.add(uranusSystem);
