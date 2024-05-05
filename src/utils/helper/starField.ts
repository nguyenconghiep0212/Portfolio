import * as THREE from "three";
import { fetchTextureMaps } from "/@/api/solarSystem";

export default async function getStarfield({ numStars = 10_000 } = {}) {
  function randomSpherePoint() {
    const radius = Math.random() * 25 + 5_000_000_000_000;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    return {
      pos: new THREE.Vector3(x, y, z),
      minDist: radius,
    };
  }
  const verts = [];
  const colors = [];
  const positions = [];
  const hues = [0, 0.1, 0.65];
  let col;
  for (let i = 0; i < numStars; i += 1) {
    const hue = hues[Math.floor(Math.random() * hues.length)];
    const p = randomSpherePoint();
    const { pos } = p;
    positions.push(p);
    col = new THREE.Color().setHSL(hue, Math.random(), Math.random());
    verts.push(pos.x, pos.y, pos.z);
    colors.push(col.r, col.g, col.b);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  const params = {
    filter: [
      {
        key: "key",
        value: "star",
      },
    ],
  };
  const res = await fetchTextureMaps(params);
  if (res) {
    const mat = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      map: new THREE.TextureLoader().load(res.data[0].url),
    });
    const points = new THREE.Points(geo, mat);
    return points;
  }
}

// import { Star } from "./star";

// export default function getStarfield(scene: any, { numStars = 5000 } = {}) {
//   function randomSpherePoint() {
//     const radius = Math.random() *  25 + 50_000_000 ;
//     const u = Math.random();
//     const v = Math.random();
//     const theta = 2 * Math.PI * u;
//     const phi = Math.acos(2 * v - 1);
//     const x = radius * Math.sin(phi) * Math.cos(theta);
//     const y = radius * Math.sin(phi) * Math.sin(theta);
//     const z = radius * Math.cos(phi);

//     return {
//       pos: new THREE.Vector3(x, y, z),
//       hue: 0.6,
//       minDist: radius,
//     };
//   }
//   for (let i = 0; i < numStars; i += 1) {
//     const p = randomSpherePoint();
//     const { pos } = p;
//     const star = new Star(pos);
//     star.toThreeObject(scene);
//   }
// }
