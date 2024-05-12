import { defineStore } from "pinia";
import { ref } from "vue";
export const useHomePage = defineStore("homePageStore", () => {
  const skills = ref([]);
  const libraries = ref([]);

  return {
    skills,
    libraries,
  };
});
