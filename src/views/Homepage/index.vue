<template>
  <div class="h-[-webkit-fill-available] mx-[15vw] space-y-2 mb-3 mt-[5vh]">
    <!-- <div>{{ t("view.test") }}</div> -->
    <div class="grid h-full grid-cols-2 gap-1 mt-30">
      <!-- ABOUT ME -->
      <AboutMe />

      <!-- EXPERIENCES -->
      <div class="pr-4 overflow-y-auto experiences">
        <Experiences />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from "/@/hooks/useI18n";
  import AboutMe from "./aboutMe.vue";
  import Experiences from "./experiences.vue";

  const { t } = useI18n();
</script>

<style>
  .experiences::-webkit-scrollbar {
    height: 2px;
    width: 2px;
    /* display: none; */
  }
  .experiences::-webkit-scrollbar-track {
    background: #000000;
    border-radius: 12px;
  }

  .experiences::-webkit-scrollbar-thumb {
    background: #49494964;
    border-radius: 12px;
  }
</style>
