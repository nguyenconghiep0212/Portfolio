import { defineStore } from "pinia";
import { ref } from "vue";

interface Planet {
  name: string;
  key: string;
  texture_map: string;
  normal_map: string;
  radius: number;
  tilt: number;
  moons: Planet[];
  ring: string;
  rotation_speed: number;
  revolution_speed: number;
  astronomical_unit: number;
  color: string;
}

export const useSolarSystem = defineStore("solarSystemStore", () => {
  const displayPath = ref(true);
  const displayGridHelper = ref(false);

  const planets = ref<Planet[]>([
    {
      name: "",
      key: "",
      texture_map: "",
      normal_map: "",
      radius: 0,
      tilt: 0,
      moons: [],
      ring: "",
      rotation_speed: 0,
      revolution_speed: 0,
      astronomical_unit: 1,
      color: "#ffffff",
    },
  ]);

  return { displayPath, displayGridHelper, planets };
});
