import { defineStore } from "pinia";
import { ref } from "vue";
import { Planet } from "/@/interface/solarSystem";

export const useSolarSystem = defineStore("solarSystemStore", () => {
  const displayPath = ref(true);
  const displayGridHelper = ref(false);
  const isRealScale = ref(true);
  const scaleDown = 0.0001;
  const controlSpeed = ref(3);
  const realTime = ref(true);
  const timelapseMultiply = ref(60);
  const BLOOM_PARAMS = {
    exposure: 1,
    strength: 1.2,
    threshold: 0.4,
    radius: 0,
  };
  const selectedPlanetMission = ref<Planet | null>(null);
  const selectedPlanet = ref<any>(null);
  const planets = ref<
    {
      raw: Planet;
      bodySystemObj: any;
      bodySystem: any;
      body: any;
      path: any;
    }[]
  >([]);
  return {
    realTime,
    selectedPlanetMission,
    selectedPlanet,
    displayPath,
    displayGridHelper,
    isRealScale,
    controlSpeed,
    timelapseMultiply,
    scaleDown,
    BLOOM_PARAMS,
    planets,
  };
});
