<template>
  <!-- PLANETS NAV -->
  <div class="absolute top-0 left-0 z-10">
    <div
      :class="`m-2  transition-all duration-200
       ${showPlanetList ? 'w-[20vw]' : 'w-0'}`"
    >
      <div class="flex items-center justify-between mb-1">
        <div
          class="tracking-widest text-white uppercase truncate transition-all duration-100 cursor-pointer text-bold opacity-60"
        >
          {{ t("view.solar_system.planet_nav.title") }}
        </div>
        <div>
          <n-button
            size="small"
            ghost
            class="bg-[#39393c99] text-white opacity-60"
            @click="showPlanetList = !showPlanetList"
          >
            <Icon
              :icon="
                showPlanetList
                  ? 'ic:baseline-keyboard-double-arrow-left'
                  : 'ic:baseline-keyboard-double-arrow-right'
              "
            />
          </n-button>
        </div>
      </div>
      <div
        class="overflow-y-auto overflow-x-hidden space-y-1 planet-list pb-1 pr-1 max-h-[70vh]"
      >
        <div
          v-for="(item, index) in store.planets"
          :key="index"
          class="bg-[#3a3a3d99] h-[7vh] hover:bg-[#39393c99] transition-all duration-100 cursor-pointer rounded-sm opacity-50 hover:opacity-100"
          @click="moveToPlanet(item)"
        >
          <div class="flex justify-between h-full">
            <div class="mx-3 my-1">
              <div class="tracking-widest text-white cursor-pointer text-bold">
                {{ item.raw.name }}
              </div>
            </div>
            <div class="translate-x-1/3">
              <img :src="item.raw.logo" class="h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- OPTION PANEL -->
  <div class="absolute top-0 right-0 z-10">
    <div class="m-2 space-y-1">
      <div class="text-right">
        <h3
          class="tracking-widest text-white uppercase cursor-pointer text-bold opacity-60"
        >
          Option
        </h3>
      </div>
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
            ? t("view.solar_system.option.show_orbit")
            : t("view.solar_system.option.hide_orbit")
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
  import { Icon } from "/@/uikits/Icon";
  import { ref, toRaw } from "vue";
  import emitter from "/@/utils/helper/emitter";
  import { Planet } from "/@/interface/solarSystem";
  const { t } = useI18n();

  const store = useSolarSystem();

  const showPlanetList = ref(true);

  function moveToPlanet(data: {
    raw: Planet;
    bodySystemObj: any;
    bodySystem: any;
    body: any;
    path: any;
  }) {
    emitter.emit("move-to-planet", {
      object3d: data.bodySystem,
      planetData: data.raw,
    });
  }
</script>

<style>
  .planet-list::-webkit-scrollbar {
    height: 4px;
    width: 4px;
  }

  .planet-list::-webkit-scrollbar-track {
    background: #25252599;
    border-radius: 12px;
  }

  .planet-list::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background: rgb(75, 75, 75);
  }
</style>
