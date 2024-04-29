import * as THREE from "three";
import { useSolarSystem } from "/@/store/solarSystem";
import { AstronomicalUnitToKilometer } from "./AstronomicalUnitToKilometer";
import { Planet } from "/@/interface/solarSystem";

export default function createLineLoopWithMesh(
  planet_object: any,
  planet_data: Planet,
  width = 1,
  opacity = 0.4
) {
  const numSegments = 5_000; // Number of segments to create the circular path
  const store = useSolarSystem();

  const material = new THREE.LineBasicMaterial({
    color: planet_data.color,
    linewidth: width,
    transparent: true,
    opacity: opacity,
  });

  const curve = new THREE.EllipseCurve(
    0, // The X center of the ellipse. Default is 0
    0, // The Y center of the ellipse. Default is 0
    AstronomicalUnitToKilometer(planet_data.perihelion_astronomical_unit) *
      store.scaleDown, // The radius of the ellipse in the x direction. Default is 1
    AstronomicalUnitToKilometer(planet_data.aphelion_astronomical_unit) *
      store.scaleDown, // The radius of the ellipse in the y direction. Default is 1
    0, // The start angle of the curve in radians starting from the positive X axis. Default is 0
    2 * Math.PI, // The end angle of the curve in radians starting from the positive X axis. Default is 2 x Math.PI
    false, // Whether the ellipse is drawn clockwise. Default is false
    0 // The rotation angle of the ellipse in radians, counterclockwise from the positive X axis (optional). Default is 0
  );

  const points = curve.getPoints(numSegments);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const ellipse = new THREE.Line(geometry, material);
  ellipse.rotation.x = Math.PI * 0.5;
  // ellipse.rotation.z = Math.PI * 1.5;
  // ellipse.rotation.y = Math.PI * 0.05;
  const clock = new THREE.Clock();

  function animatedPath() {
    const v = new THREE.Vector3();
    const t = store.realTime
      ? clock.getElapsedTime() *
        (1 / (planet_data.synodic_orbital_period * 31_536_000))
      : ((clock.getElapsedTime() * (1 / planet_data.synodic_orbital_period)) /
          store.timelapseMultiply) %
        1; // Time to finish 1 revolution

    curve.getPointAt(t, v);
    planet_object.position.copy(v);
    planet_object.position.applyMatrix4(ellipse.matrixWorld);
  }
  return {
    animatedPath: animatedPath,
    path: ellipse,
  };
}
