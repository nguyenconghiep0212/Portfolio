<template>
  <!-- PLANETS NAV -->
  <div class="absolute top-0 left-0">
    <div class="m-2 space-y-1"></div>
  </div>
  <!-- OPTION PANEL -->
  <div class="absolute top-0 right-0 z-10">
    <div class="m-2 space-y-1">
      <h3 class="text-white text-bold">Option</h3>
      <div
        :class="`p-2 cursor-pointer  ${
          store.displayPath
            ? 'bg-[#ffffffb0] text-black'
            : 'bg-[#ffffff33] text-white'
        }`"
        @click="store.displayPath = !store.displayPath"
      >
        {{
          store.displayPath
            ? t("view.solar_system.show_orbit")
            : t("view.solar_system.hide_orbit")
        }}
      </div>
      <div
        :class="`p-2 cursor-pointer  ${
          store.displayGridHelper
            ? 'bg-[#ffffffb0] text-black'
            : 'bg-[#ffffff33] text-white'
        }`"
        @click="store.displayGridHelper = !store.displayGridHelper"
      >
        {{ store.displayGridHelper ? "Show grid" : "Hide grid" }}
      </div>
      <div
        :class="`p-2 cursor-pointer  ${
          store.isRealScale
            ? 'bg-[#ffffffb0] text-black'
            : 'bg-[#ffffff33] text-white'
        }`"
        @click="store.isRealScale = !store.isRealScale"
      >
        {{ store.isRealScale ? "Real scale" : "Relative scale" }}
      </div>
    </div>
  </div>

  <!-- NAV PANEL -->

  <!-- FOOTER -->
  <div class="absolute z-10 bottom-1 left-1">
    <div class="opacity-50">
      <span class="mr-1 text-white"> Inspired by </span>
      <a
        class="text-blue-400 underline"
        href="https://eyes.nasa.gov/apps/solar-system/#/home"
        target="_blank"
      >
        Nasa solar model
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useSolarSystem } from "/@/store/solarSystem";
  import { useI18n } from "/@/hooks/useI18n";

  const { t } = useI18n();

  const store = useSolarSystem();
</script>
