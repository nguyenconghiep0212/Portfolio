<template>
  <div
    class="h-[-webkit-fill-available] space-y-2 mb-3 mt-[5vh]"
    @mousemove="onMouseHighlight"
  >
    <!-- <div>{{ t("view.test") }}</div> -->
    <div
      ref="mouseHighlight"
      class="fixed inset-0 z-30 transition duration-300 pointer-events-none"
    ></div>
    <div class="grid h-full mx-[15vw] grid-cols-2 gap-1 mt-30">
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
  import { ref } from "vue";

  const { t } = useI18n();
  const mouseHighlight = ref<any>(null);
  function onMouseHighlight(event: MouseEvent) {
    if (mouseHighlight.value)
      if (mouseHighlight.value.style)
        mouseHighlight.value.style.background = `radial-gradient(
          1000px at ${event.clientX}px ${event.clientY}px,
          rgba(29, 78, 216, 0.15),
          transparent 80%
        )`;
  }
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
