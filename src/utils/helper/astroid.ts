import * as THREE from "three";
interface IVertices {
  [index: string]: {
    x: number;
    y: number;
    z: number;
  };
}

export default function createRock(size: number) {
  const geometry = new THREE.DodecahedronGeometry(size, 1);

  const positionAttribute = geometry.getAttribute("position");
  const point = new THREE.Vector3();
  const vertices: IVertices = {};

  // Go thru all points and collect points on same vertex with a hashmap
  for (let i = 0; i < positionAttribute.count; i++) {
    point.fromBufferAttribute(positionAttribute, i);
    const key = [point.x, point.y, point.z].join(",");
    if (!vertices[key]) {
      vertices[key] = {
        x: (point.x += (Math.random() * size) / 4),
        y: (point.y += (Math.random() * size) / 4),
        z: (point.z += (Math.random() * size) / 4),
      };
    }
    // Modify all points on same vertex with same deformation
    const { x, y, z } = vertices[key];
    positionAttribute.setXYZ(i, x, y, z);
  }

  let color = "#ffffff";
  color = ColorLuminance(color, 2 + Math.random() * 10);
  const texture = new THREE.MeshStandardMaterial({
    color: color,
    // shading: THREE.FlatShading,
    // shininess: 0.5,
    // roughness: 0.8,
    // metalness: 1,
    wireframe: true,
  });

  const cube = new THREE.Mesh(geometry, texture);
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.scale.set(
    1 + Math.random() * 0.4,
    1 + Math.random() * 0.8,
    1 + Math.random() * 0.4
  );
  cube.r = {};
  cube.r.x = Math.random() * 0.005;
  cube.r.y = Math.random() * 0.005;
  cube.r.z = Math.random() * 0.005;
  return cube;
}

function ColorLuminance(hex: string | any[], lum: number) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, "");
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  let rgb = "#";
  let c;
  let i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }

  return rgb;
}
