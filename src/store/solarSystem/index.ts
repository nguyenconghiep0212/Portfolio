import { defineStore } from "pinia";
import { ref } from "vue";

export const useSolarSystem = defineStore("solarSystemStore", () => {
  const displayPath = ref(true);
  const displayGridHelper = ref(false);
  const isRealScale = ref(true);

  const controlSpeed = ref(3);
  return { displayPath, displayGridHelper, isRealScale, controlSpeed };
});
