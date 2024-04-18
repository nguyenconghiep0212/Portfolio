import { defineStore } from "pinia";
import { ref } from "vue";

export const useSolarSystem = defineStore("solarSystemStore", () => {
  const displayPath = ref(false);
  return { displayPath };
});
