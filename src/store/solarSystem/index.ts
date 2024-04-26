import { defineStore } from "pinia";
import { ref } from "vue";

export const useSolarSystem = defineStore("solarSystemStore", () => {
  const displayPath = ref(true);
  const displayGridHelper = ref(false);
  const isRealScale = ref(true);
  const scaleDown = 0.0001;

  const controlSpeed = ref(3);
  const BLOOM_PARAMS = {
    exposure: 1,
    strength: 1.2,
    threshold: 0.4,
    radius: 0,
  };
  return {
    displayPath,
    displayGridHelper,
    isRealScale,
    controlSpeed,
    scaleDown,
    BLOOM_PARAMS,
  };
});
