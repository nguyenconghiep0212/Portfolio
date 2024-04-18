import * as THREE from "three";
import createRock from "/@/utils/helper/astroid";

export const marsSystemObj = new THREE.Object3D();
const marsSystem = new THREE.Object3D();
marsSystem.position.set(90, 0, 0);

const marsTextureMap = new THREE.TextureLoader().load(
  "src/assets/images/mars.jpg"
);
const marsNormalMap = new THREE.TextureLoader().load(
  "src/assets/images/mars_normal_map.jpg"
);

const marsGeo = new THREE.SphereGeometry(3, 32, 32);
const marsMat = new THREE.MeshStandardMaterial({
  map: marsTextureMap,
  normalMap: marsNormalMap,
});
export const mars = new THREE.Mesh(marsGeo, marsMat);

export const phobosObj = new THREE.Object3D();
const phobos = createRock(0.3);
phobosObj.add(phobos);
phobos.position.set(5, 0, 0);

export const deimosObj = new THREE.Object3D();
const deimos = createRock(0.2);
deimosObj.add(deimos);
deimos.position.set(6, 0, 0);

marsSystem.add(mars, phobosObj, deimosObj);
marsSystemObj.add(marsSystem);
