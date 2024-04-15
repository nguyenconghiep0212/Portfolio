import * as THREE from "three";
import createRock from "/@/utils/helper/astroid";

export const MarsSystemObj = new THREE.Object3D();
export const MarsSystem = new THREE.Object3D();
MarsSystem.position.set(60, 0, 0);

const MarsTextureMap = new THREE.TextureLoader().load(
  "src/assets/images/mars.jpg"
);
const MarsNormalMap = new THREE.TextureLoader().load(
  "src/assets/images/mars_normal_map.jpg"
);

const MarsGeo = new THREE.SphereGeometry(3, 32, 32);
const MarsMat = new THREE.MeshStandardMaterial({
  map: MarsTextureMap,
  normalMap: MarsNormalMap,
});
export const Mars = new THREE.Mesh(MarsGeo, MarsMat);

export const PhobosObj = new THREE.Object3D();
const Phobos = createRock(0.3)
PhobosObj.add(Phobos);
Phobos.position.set(5, 0, 0);

export const DeimosObj = new THREE.Object3D();
const Deimos = createRock(0.2)
DeimosObj.add(Deimos);
Deimos.position.set(6, 0, 0);

MarsSystem.add(Mars, PhobosObj, DeimosObj);

MarsSystemObj.add(MarsSystem);
