import { defineStore } from "pinia";
import { ref } from "vue";
import { Planet } from "/@/interface/solarSystem";

export const useSolarSystem = defineStore("solarSystemStore", () => {
  const displayPath = ref(true);
  const displayGridHelper = ref(false);

  const planets = ref<Planet[]>([]);

  return { displayPath, displayGridHelper, planets };
});
