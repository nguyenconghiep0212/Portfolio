import * as THREE from "three";
export default function createLineLoopWithMesh(
  radius: number,
  color: number | string,
  width: number,
  opacity = 0.4
) {
  const material = new THREE.LineBasicMaterial({
    color: color,
    linewidth: width,
    transparent: true,
    opacity: opacity,
  });
  const geometry = new THREE.BufferGeometry();
  const lineLoopPoints = [];

  // Calculate points for the circular path
  const numSegments = 100; // Number of segments to create the circular path
  for (let i = 0; i <= numSegments; i++) {
    const angle = (i / numSegments) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    lineLoopPoints.push(x, 0, z);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(lineLoopPoints, 3)
  );
  const lineLoop = new THREE.LineLoop(geometry, material);
  return lineLoop;
}
