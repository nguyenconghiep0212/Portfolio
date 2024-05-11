<template>
  <div class="h-[-webkit-fill-available] mx-[15vw] space-y-2 mb-3 mt-[5vh]">
    <!-- <div>{{ t("view.test") }}</div> -->
    <div class="grid h-full grid-cols-2 gap-1 mt-30">
      <!-- ABOUT ME -->
      <AboutMe />

      <!-- EXPERIENCES -->
      <Experiences />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from "/@/hooks/useI18n";
  import AboutMe from "./aboutMe.vue";
  import Experiences from "./experiences.vue";

  const { t } = useI18n();
</script>
