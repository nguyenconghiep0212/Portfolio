<template>
  <div class="flex flex-col items-start justify-between h-full">
    <div>
      <!-- INTRODUCTION -->
      <div class="space-y-1 text-left">
        <div class="text-4xl font-bold tracking-tight font-inter">
          {{ aboutMe.name }}
        </div>
        <div class="text-xl font-medium tracking-tight font-inter">
          {{ aboutMe.title }}
        </div>
        <div class="py-2 text-lg text-left opacity-60">
          {{ aboutMe.description }}
        </div>
      </div>

      <!-- SKILL -->
      <div class="mt-6 text-left">
        <div class="flex items-center space-x-2">
          <span class="text-lg font-bold tracking-widest uppercase opacity-60">
            Language & frameworks
          </span>
          <span class="h-[1px] bg-white opacity-60 w-32"></span>
        </div>
        <div v-if="store.skills.length" class="mt-3 space-y-2">
          <div class="flex flex-wrap">
            <div
              v-for="(item, index) in store.skills.filter(
                (e) => e.priority === 2
              )"
              :key="index"
              class="flex flex-col items-center justify-center w-20 mr-2 bg-white border-2 border-solid rounded-lg bg-opacity-10 aspect-square border-cyan-400"
            >
              <img :src="item.url" class="w-5 h-5 mb-1" />
              <div class="text-xs font-bold tracking-widest opacity-60">
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
              class="mr-2 w-20 flex flex-col items-center justify-center bg-white rounded-lg bg-opacity-10 aspect-square border-2 border-solid border-[silver]"
            >
              <img :src="item.url" class="w-5 h-5 mb-1" />
              <div class="text-xs font-bold tracking-widest opacity-60">
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
              class="flex flex-col items-center justify-center w-20 mr-2 bg-white border-2 border-solid rounded-lg bg-opacity-10 aspect-square border-slate-700"
            >
              <img :src="item.url" class="w-5 h-5 mb-1" />
              <div class="text-xs font-bold tracking-widest opacity-60">
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
          <span class="text-lg font-bold tracking-widest uppercase opacity-60">
            Libraries
          </span>
          <span class="h-[1px] bg-white opacity-60 w-32"></span>
        </div>
        <div v-if="store.libraries.length" class="mt-3 space-y-2">
          <div class="flex flex-wrap">
            <div
              v-for="(item, index) in store.libraries.filter(
                (e) => e.priority === 2
              )"
              :key="index"
              class="flex flex-col items-center justify-center w-20 mr-2 bg-white border-2 border-solid rounded-lg bg-opacity-10 aspect-square border-cyan-400"
            >
              <img :src="item.url" class="w-5 h-5 mb-1" />
              <div class="flex text-xs font-bold tracking-widest opacity-60">
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
              class="mr-2 w-20 flex flex-col items-center justify-center bg-white rounded-lg bg-opacity-10 aspect-square border-2 border-solid border-[silver]"
            >
              <img :src="item.url" class="w-5 h-5 mb-1" />
              <div class="text-xs font-bold tracking-widest opacity-60">
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
              class="flex flex-col items-center justify-center w-20 mr-2 bg-white border-2 border-solid rounded-lg bg-opacity-10 aspect-square border-slate-700"
            >
              <img :src="item.url" class="w-5 h-5 mb-1" />
              <div class="text-xs font-bold tracking-widest opacity-60">
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
    <div class="flex mb-4 space-x-5">
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
        } else if (["nodejs", "three"].includes(e.key)) {
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
</script>
