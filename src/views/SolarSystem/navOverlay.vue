<template>
  <!-- TIME LAPSE -->
  <div class="absolute z-10 bottom-10 left-1/2">
    <div class="space-y-1 -translate-x-1/2 w-max">
      <div
        v-if="!store.realTime"
        class="flex justify-center space-x-1 font-bold tracking-widest truncate transition-all duration-100 opacity-60"
      >
        <span class="mr-1">1 year =</span>
        <span class="text-green-400">
          {{ timeDisplay }}
        </span>
        <n-dropdown
          trigger="hover"
          :options="timelapseOptions"
          @select="timelapseUnitChange"
        >
          <span>{{ timelapseUnit }}</span>
        </n-dropdown>
      </div>
      <div class="grid grid-cols-3 gap-7 min-h-[34px]">
        <div>
          <n-button
            v-if="!store.realTime"
            :disabled="timeDisplay === 1 || store.realTime"
            quaternary
            class="opacity-60 !bg-[#ffffff4d] w-min"
            @click="decreaseTimelapse"
          >
            <Icon icon="solar:skip-previous-line-duotone" />
          </n-button>
        </div>

        <div class="flex items-center justify-center">
          <div
            :class="`${
              store.realTime
                ? 'bg-green-600 before:bg-green-600'
                : 'bg-blue-600 before:bg-blue-600'
            } rounded-full w-4 h-4 cursor-pointer before:w-6 before:h-6 before:opacity-60 before:content-[''] before:flex before:-m-1 before:rounded-full`"
            @click="handleChangeTime"
          ></div>
        </div>
        <div>
          <n-button
            v-if="!store.realTime"
            :disabled="store.realTime"
            quaternary
            class="opacity-60 !bg-[#ffffff4d] w-min"
            @click="increaseTimelapse"
          >
            <Icon icon="solar:skip-next-line-duotone" />
          </n-button>
        </div>
      </div>
      <div
        :class="`tracking-widest text-[16px] uppercase ${
          store.realTime ? 'text-green-600' : 'text-blue-600'
        }   truncate transition-all duration-100 font-bold opacity-60`"
      >
        {{ store.realTime ? "Real time" : "Relative time" }}
      </div>
    </div>
  </div>

  <!-- PLANETS NAV -->
  <div class="absolute top-0 left-0 z-10">
    <div class="flex">
      <div
        :class="`m-2  transition-all duration-200
       ${showPlanetList ? 'w-[20vw]' : 'w-0'}`"
      >
        <div class="flex items-center justify-between mb-1">
          <div
            class="font-bold tracking-widest uppercase truncate transition-all duration-100 cursor-pointer opacity-60"
          >
            {{ t("view.solar_system.planet_nav.title") }}
          </div>
          <div>
            <n-button
              size="small"
              ghost
              class="bg-[#39393c99] opacity-60"
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
            class="bg-[#3a3a3d99] h-[7vh] hover:bg-[#39393c99] transition-all duration-100 rounded-sm opacity-40 hover:opacity-100 cursor-pointer"
            @click="panToPlanet(item)"
          >
            <div class="flex justify-between h-full">
              <div class="flex flex-col justify-between mx-3 my-1">
                <div class="font-bold tracking-widest cursor-pointer">
                  {{ item.raw.name }}
                </div>
                <div class="flex mb-1 space-x-2">
                  <Icon
                    class="cursor-pointer"
                    :icon="
                      store.selectedPlanet
                        ? store.selectedPlanet.planetData.key === item.raw.key
                          ? 'solar:pin-bold'
                          : 'solar:pin-broken'
                        : 'solar:pin-broken'
                    "
                    @click="pinPlanet(item)"
                  />
                  <Icon
                    class="cursor-pointer"
                    icon="solar:satellite-linear"
                    @click="displayPlanetInfo($event, item)"
                  />
                </div>
              </div>
              <div class="translate-x-1/3">
                <img :src="item.raw.logo" class="h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="store.selectedPlanetMission"
        :class="`${
          showPlanetList ? (showMission ? 'w-[50vw]' : 'w-0') : 'w-0'
        } h-[inherit] transition-all duration-100 `"
      >
        <PlanetMission @close="handleClose" />
      </div>
    </div>
  </div>
  <!-- OPTION PANEL -->
  <div class="absolute top-0 right-0 z-10">
    <div class="m-2 space-y-1">
      <div class="text-right">
        <h3
          class="font-bold tracking-widest uppercase cursor-pointer opacity-60"
        >
          Option
        </h3>
      </div>
      <div
        :class="`p-2 cursor-pointer  ${
          store.displayPath ? 'bg-[#ffffffb0] text-black' : 'bg-[#ffffff33] '
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
            : 'bg-[#ffffff33] '
        }`"
        @click="store.displayGridHelper = !store.displayGridHelper"
      >
        {{ store.displayGridHelper ? "Show grid" : "Hide grid" }}
      </div>
      <div
        :class="`p-2 cursor-pointer  ${
          store.isRealScale ? 'bg-[#ffffffb0] text-black' : 'bg-[#ffffff33] '
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
    <div class="italic opacity-30">Real time position is not supported</div>
  </div>
</template>

<script lang="ts" setup>
import { useSolarSystem } from "/@/store/solarSystem";
import { useI18n } from "/@/hooks/useI18n";

import { ref, watchEffect } from "vue";
import emitter from "/@/utils/helper/emitter";
import { Planet } from "/@/interface/solarSystem";
import PlanetMission from "./planetMission.vue";
const { t } = useI18n();

const store = useSolarSystem();

const showMission = ref(false);
const timelapseUnit = ref("minute(s)");
const timelapseOptions = [
  {
    key: "second(s)",
    label: "second",
  },
  {
    key: "minute(s)",
    label: "minute",
  },
  {
    key: "hour(s)",
    label: "hour",
  },
  {
    key: "day(s)",
    label: "day",
  },
];
const showPlanetList = ref(true);
const timeDisplay = ref(0);

watchEffect(() => {
  if (timelapseUnit.value === "minute(s)") {
    timeDisplay.value = store.timelapseMultiply / 60;
  } else if (timelapseUnit.value === "hour(s)") {
    timeDisplay.value = store.timelapseMultiply / (60 * 60);
  } else if (timelapseUnit.value === "day(s)") {
    timeDisplay.value = store.timelapseMultiply / (60 * 60 * 24);
  } else {
    timeDisplay.value = store.timelapseMultiply;
  }
});

function pinPlanet(data: {
  raw: Planet;
  bodySystemObj: any;
  bodySystem: any;
  body: any;
  path: any;
}) {
  if (store.selectedPlanet) {
    if (store.selectedPlanet.planetData.key === data.raw.key) {
      store.selectedPlanet = null;
    } else {
      emitter.emit("pin-planet", {
        object3d: data.bodySystem,
        planetData: data.raw,
      });
    }
  } else {
    emitter.emit("pin-planet", {
      object3d: data.bodySystem,
      planetData: data.raw,
    });
  }
}

function panToPlanet(data: {
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

function increaseTimelapse() {
  switch (timelapseUnit.value) {
    case "minute(s)":
      store.timelapseMultiply = store.timelapseMultiply + 60;
      break;
    case "hour(s)":
      store.timelapseMultiply = store.timelapseMultiply + 60 * 60;
      break;
    case "day(s)":
      store.timelapseMultiply = store.timelapseMultiply + 60 * 60 * 24;
      break;
    default:
      ++store.timelapseMultiply;
      break;
  }
}
function decreaseTimelapse() {
  if (store.timelapseMultiply > 0) {
    switch (timelapseUnit.value) {
      case "minute(s)":
        store.timelapseMultiply = store.timelapseMultiply - 60;
        break;
      case "hour(s)":
        store.timelapseMultiply = store.timelapseMultiply - 60 * 60;
        break;
      case "day(s)":
        store.timelapseMultiply = store.timelapseMultiply - 60 * 60 * 24;
        break;
      default:
        --store.timelapseMultiply;
        break;
    }
  }
}

function timelapseUnitChange(event: string) {
  timelapseUnit.value = event;
  switch (timelapseUnit.value) {
    case "minute(s)":
      store.timelapseMultiply = timeDisplay.value * 60;
      break;
    case "hour(s)":
      store.timelapseMultiply = timeDisplay.value * 60 * 60;
      break;
    case "day(s)":
      store.timelapseMultiply = timeDisplay.value * 60 * 60 * 24;
      break;
    default:
      store.timelapseMultiply = timeDisplay.value;
      break;
  }
}

function handleChangeTime() {
  store.realTime = !store.realTime;
}

function displayPlanetInfo(event: MouseEvent, data: any) {
  event.stopPropagation();
  showMission.value = true;
  store.selectedPlanetMission = data.raw;
}

function handleClose() {
  showMission.value = !showMission.value;
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
