import * as THREE from "three";
const pointLight1 = new THREE.PointLight(0xffffff, 2, 500, 0);
export const sunLightHelper = new THREE.PointLightHelper(pointLight1);

const sunTexture = new THREE.TextureLoader().load("src/assets/images/sun.jpg");

const sunGeo = new THREE.SphereGeometry(20, 32, 32);
const sunMat = new THREE.MeshBasicMaterial({
  map: sunTexture,
});
export const sun = new THREE.Mesh(sunGeo, sunMat);
sun.add(pointLight1);
