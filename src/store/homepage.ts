import { defineStore } from "pinia";
import { ref } from "vue";
export const useHomePage = defineStore("homePageStore", () => {
  const skills = ref<any>([]);
  const libraries = ref<any>([]);

  return {
    skills,
    libraries,
  };
});
