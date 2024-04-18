<template>
  <div class="m-2 space-y-1">
    <h3 class="text-bold text-white">Option</h3>
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
  </div>
</template>

<script lang="ts" setup>
  import { useSolarSystem } from "/@/store/solarSystem";
  import { useI18n } from "/@/hooks/useI18n";

  const { t } = useI18n();

  const store = useSolarSystem();
</script>
