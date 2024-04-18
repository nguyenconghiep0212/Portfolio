import { defineStore } from "pinia";
import { ref } from "vue";

export const useSolarSystem = defineStore("solarSystemStore", () => {
  const displayPath = ref(true);
  const displayGridHelper = ref(false);
  return { displayPath, displayGridHelper };
});
