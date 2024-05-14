<template>
  <div class="flex flex-col items-start justify-between h-full">
    <div class="w-full">
      <!-- INTRODUCTION -->
      <div class="space-y-1 text-left">
        <div
          class="px-4 py-3 text-5xl font-bold tracking-tight uppercase transition-all duration-150 font-inter w-max bg-sky-500 mix-blend-screen"
        >
          {{ aboutMe.name }}
        </div>
        <div
          class="pt-3 px-4 pb-1 !-ml-2 !-mt-3 bg-[darkcyan] mix-blend-screen w-max text-2xl font-medium tracking-tight transition-all duration-150 font-inter"
        >
          {{ aboutMe.title }}
        </div>
        <div class="py-2 text-lg text-left opacity-60">
          {{ aboutMe.description }}
        </div>
      </div>

      <!-- STUDY -->
      <div class="mt-6 text-left">
        <div class="flex items-center space-x-4">
          <span
            class="text-lg font-bold tracking-widest uppercase w-36 px-2 py-1 bg-[darkcyan]"
          >
            <span class="opacity-80">{{ t("view.homepage.academic") }}</span>
          </span>
          <span class="h-[1px] bg-white opacity-60 w-full"></span>
        </div>
        <div class="mt-2">
          <div class="text-xs tracking-wide uppercase opacity-60">
            {{ aboutMe.study.dateOfService[0] }} -
            {{ aboutMe.study.dateOfService[1] }}
          </div>
          <div
            class="font-semibold tracking-widest truncate font-inter opacity-70"
          >
            {{ aboutMe.study.university }}
          </div>
        </div>
      </div>

      <!-- SKILL -->
      <div class="mt-6 text-left">
        <div class="flex items-center space-x-2">
          <div
            class="text-lg font-bold tracking-widest uppercase w-[32rem] px-2 py-1 bg-[darkcyan]"
          >
            <span class="opacity-80">
              {{ t("view.homepage.languages") }} &
              {{ t("view.homepage.frameworks") }}
            </span>
          </div>
          <span class="h-[1px] bg-white opacity-60 w-full"></span>
        </div>
        <div v-if="store.skills.length" class="mt-3">
          <div class="flex flex-wrap">
            <div
              v-for="(item, index) in store.skills.filter(
                (e) => e.priority === 2
              )"
              :key="index"
              class="flex flex-col items-center justify-center w-20 mt-2 mr-2 bg-white border-2 border-solid rounded-lg bg-opacity-10 aspect-square border-[#ffd70085]"
            >
              <img :src="item.url" class="w-5 h-5 mb-1" />
              <div class="text-[11px] tracking-widest opacity-60">
                {{ item.customName }}
              </div>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div
              v-for="(item, index) in store.skills.filter(
                (e) => e.priority === 1
              )"
              :key="index"
              class="mt-2 mr-2 w-20 flex flex-col items-center justify-center bg-white rounded-lg bg-opacity-10 aspect-square border-2 border-solid border-[#c0c0c0a6]"
            >
              <img :src="item.url" class="w-5 h-5 mb-1" />
              <div class="text-[11px] tracking-widest opacity-60">
                {{ item.customName }}
              </div>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div
              v-for="(item, index) in store.skills.filter(
                (e) => e.priority === 0
              )"
              :key="index"
              class="flex flex-col items-center justify-center w-20 mt-2 mr-2 bg-white rounded-lg bg-opacity-10 aspect-square"
            >
              <img :src="item.url" class="w-5 h-5 mb-1" />
              <div class="text-[11px] tracking-widest opacity-60">
                {{ item.customName }}
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <n-skeleton :repeat="4" class="w-3/4" />
          <n-skeleton text class="w-2/3" />
        </div>
      </div>

      <!-- LIBRARY -->
      <div class="mt-6 text-left">
        <div class="flex items-center space-x-2">
          <span
            class="text-lg font-bold tracking-widest uppercase w-32 px-2 py-1 bg-[darkcyan]"
          >
          <span class="opacity-80">{{ t("view.homepage.libraries") }}</span>

          </span>
          <span class="h-[1px] bg-white opacity-60 w-32"></span>
        </div>
        <div v-if="store.libraries.length" class="mt-3">
          <div class="flex flex-wrap">
            <div
              v-for="(item, index) in store.libraries.filter(
                (e) => e.priority === 2
              )"
              :key="index"
              class="flex flex-col items-center justify-center w-20 mt-2 mr-2 bg-white border-2 border-solid rounded-lg bg-opacity-10 aspect-square border-[#ffd70085]"
            >
              <img :src="item.url" class="w-5 h-5 mb-1" />
              <div class="flex text-[11px] tracking-widest opacity-60">
                {{ item.customName }}
              </div>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div
              v-for="(item, index) in store.libraries.filter(
                (e) => e.priority === 1
              )"
              :key="index"
              class="mt-2 mr-2 w-20 flex flex-col items-center justify-center bg-white rounded-lg bg-opacity-10 aspect-square border-2 border-solid border-[#c0c0c0a6]"
            >
              <img :src="item.url" class="w-5 h-5 mb-1" />
              <div class="text-[11px] tracking-widest opacity-60">
                {{ item.customName }}
              </div>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div
              v-for="(item, index) in store.libraries.filter(
                (e) => e.priority === 0
              )"
              :key="index"
              class="flex flex-col items-center justify-center w-20 mt-2 mr-2 bg-white rounded-lg bg-opacity-10 aspect-square"
            >
              <img :src="item.url" class="w-5 h-5 mb-1" />
              <div class="text-[11px] tracking-widest opacity-60">
                {{ item.customName }}
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <n-skeleton :repeat="4" class="w-3/4" />
          <n-skeleton text class="w-2/3" />
        </div>
      </div>
    </div>
    <div class="flex flex-col items-start mt-8 space-y-1">
      <div class="flex space-x-5">
        <div v-for="(item, index) in aboutMe.contacts" :key="index" class="">
          <a :href="item.url" target="_blank">
            <img
              :src="item.url_img"
              :class="`
              ${item.label === 'Github' ? 'invert' : ''}
               w-9 h-9 mb-1 grayscale opacity-40 hover:opacity-100 transition-all duration-150`"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from "/@/hooks/useI18n";
  import { ref } from "vue";
  import { aboutMe } from "./mock";
  import { fetchTextureMaps } from "/@/api/solarSystem";
  import { useHomePage } from "/@/store/homepage";

  const store = useHomePage();
  const { t } = useI18n();

  fetchSkills();
  fetchLibraries();
  async function fetchSkills() {
    const params = {
      filter: [
        {
          key: "folder",
          value: "Skills",
        },
      ],
    };
    const res = await fetchTextureMaps(params);
    if (res) {
      res.data.forEach((e: any) => {
        // MAKE A TABLE LATER YOU LAZY BASTARD
        if (["js", "ts", "vue"].includes(e.key)) {
          e.priority = 2;
        } else if (["nodejs", "three", "nestjs"].includes(e.key)) {
          e.priority = 0;
        } else e.priority = 1;
      });
      store.skills = res.data;
    }
  }
  async function fetchLibraries() {
    const params = {
      filter: [
        {
          key: "folder",
          value: "Libraries",
        },
      ],
    };
    const res = await fetchTextureMaps(params);
    if (res) {
      res.data.forEach((e: any) => {
        // MAKE A TABLE LATER YOU LAZY BASTARD
        if (["pinia", "tailwind", "antd", "el"].includes(e.key)) {
          e.priority = 2;
        } else if (["bootstrap", "recoil"].includes(e.key)) {
          e.priority = 0;
        } else e.priority = 1;
      });
      store.libraries = res.data;
    }
  }

  function getSKillImg(key: string): string {
    let found: any = store.skills.find((e: any) => e.key === key);
    if (!found) {
      found = store.libraries.find((e: any) => e.key === key);
    }
    return found ? found.url : "N/A";
  }
</script>
