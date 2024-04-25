import * as THREE from "three";
import { Planet } from "/@/interface/solarSystem";
import createLineLoopWithMesh from "/@/utils/helper/orbitalPath";
import { AstronomicalUnitToKilometer } from "/@/utils/helper/AstronomicalUnitToKilometer";
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
const scale_down = 0.0001;

export function planet_generator(planet_data: Planet) {
  const planets: { bodies: any[]; paths: any[] } = { bodies: [], paths: [] };

  // INIT PLANET SYSTEM
  const planetSystemObj = new THREE.Object3D();
  const planetSystem = new THREE.Object3D();
  planetSystem.position.set(
    AstronomicalUnitToKilometer(planet_data.perihelion_astronomical_unit) *
      scale_down,
    0,
    0
  );
  const planetTexture = new THREE.TextureLoader().load(planet_data.texture_map);
  const planetNormalTexture = new THREE.TextureLoader().load(
    planet_data.normal_map
  );
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(planet_data.radius * scale_down, 32, 32),
    new THREE.MeshStandardMaterial({
      map: planetTexture,
      normalMap: planetNormalTexture,
    })
  );

  // ADD LIGHT TO STAR
  if (planet_data.key === "sun") {
    const pointLight = new THREE.PointLight(
      0xffffff,
      planet_data.luminosity * 5,
      5_000_000,
      0
    );
    planet.add(pointLight);
  }

  // ADD MOONS TO SYSTEM
  if (planet_data.moons)
    if (planet_data.moons.length) {
      planet_data.moons.forEach((e: Planet) => {
        const moonObj = new THREE.Object3D();
        const moon = new THREE.Mesh(
          new THREE.SphereGeometry(e.radius * scale_down, 32, 32),
          new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(e.texture_map),
            normalMap: new THREE.TextureLoader().load(e.normal_map),
          })
        );
        moon.position.set(
          AstronomicalUnitToKilometer(e.perihelion_astronomical_unit) *
            scale_down,
          0,
          0
        );
        //   MOON LUMINOSITY
        const pointLightMoon = new THREE.PointLight(
          e.color || 0xffffff,
          0.2,
          500,
          0
        );
        moon.add(pointLightMoon);
        moonObj.add(moon);
        planetSystem.add(moonObj);
        //   PATH
        const moonPath = createLineLoopWithMesh(
          AstronomicalUnitToKilometer(e.perihelion_astronomical_unit) *
            scale_down,
          e.color || 0xffffff,
          3
        );
        planetSystem.add(moonPath);
      });
    }

  // ADD PLANET ORBITAL PATH
  const planetPath = createLineLoopWithMesh(
    AstronomicalUnitToKilometer(planet_data.perihelion_astronomical_unit) *
      scale_down,
    planet_data.color || "white",
    1
  );

  // ADD LABEL

  planetSystem.add(planet);
  planetSystemObj.add(planetSystem);

  planets.bodies.push(planetSystemObj);
  planets.paths.push(planetPath);

  return planets;
}
