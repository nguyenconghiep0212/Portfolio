import * as THREE from "three";
import { Planet } from "/@/interface/solarSystem";
import createLineLoopWithMesh from "/@/utils/helper/orbitalPath";
import { watchEffect } from "vue";
import { useSolarSystem } from "/@/store/solarSystem";
import { AstronomicalUnitToKilometer } from "/@/utils/helper/AstronomicalUnitToKilometer";

const store = useSolarSystem();

export function planet_generator(planet_data: Planet) {
  console.log(
    AstronomicalUnitToKilometer(planet_data.perihelion_astronomical_unit) *
      0.001,
    "orbital distance"
  );
  console.log(planet_data.radius * 0.001, "planet size");
  const planets: { bodies: any[]; paths: any[] } = { bodies: [], paths: [] };
  const planetSystemObj = new THREE.Object3D();
  const planetSystem = new THREE.Object3D();
  planetSystem.position.set(
    AstronomicalUnitToKilometer(planet_data.perihelion_astronomical_unit) *
      0.001,
    0,
    0
  );

  const planetTexture = new THREE.TextureLoader().load(planet_data.texture_map);
  const planetNormalTexture = new THREE.TextureLoader().load(
    planet_data.normal_map
  );
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(planet_data.radius * 1, 32, 32),
    new THREE.MeshStandardMaterial({
      map: planetTexture,
      normalMap: planetNormalTexture,
    })
  );
  if (planet_data.key === "sun") {
    const pointLight = new THREE.PointLight(
      0xffffff,
      planet_data.luminosity * 10,
      5_000_000,
      0
    );
    planet.add(pointLight);
  }
  if (planet_data.moons)
    if (planet_data.moons.length) {
      planet_data.moons.forEach((e: Planet) => {
        const moonObj = new THREE.Object3D();
        const moon = new THREE.Mesh(
          new THREE.SphereGeometry(1, 32, 32),
          new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(e.texture_map),
            normalMap: new THREE.TextureLoader().load(e.normal_map),
          })
        );
        moon.position.set(5, 0, 0);

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
        planets.bodies.push(moonObj);
        //   PATH
        const moonPath = createLineLoopWithMesh(6, e.color || 0xffffff, 3);
        watchEffect(() => {
          if (store.displayPath) {
            planetSystem.add(moonPath);
          } else {
            planetSystem.remove(moonPath);
          }
        });
      });
    }

  const planetPath = createLineLoopWithMesh(
    70,
    planet_data.color || "white",
    1
  );

  planetSystem.add(planet);
  planetSystemObj.add(planetSystem);

  planets.bodies.push(planetSystemObj);
  planets.paths.push(planetPath);

  return planets;
}
