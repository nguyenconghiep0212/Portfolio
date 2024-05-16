<template>
  <div class="flex flex-col items-start justify-between h-full">
    <div>
      <!-- INTRODUCTION -->
      <div class="space-y-1 text-left">
        <div
          class="px-2 py-2 text-4xl font-bold tracking-tight uppercase transition-all duration-150 w-96 font-inter hover:w-full bg-sky-500 mix-blend-screen"
        >
          {{ aboutMe.name }}
        </div>
        <div
          class="pt-3 px-4 pb-1 !-ml-2 !-mt-3 text-xl font-medium tracking-tight transition-all duration-150 font-inter w-60 hover:w-80 bg-[darkcyan] mix-blend-screen"
        >
          {{ aboutMe.title }}
        </div>
        <div class="py-2 text-lg text-left opacity-60">
          {{ aboutMe.description }}
        </div>
      </div>

      <!-- STUDY -->
      <div class="mt-6 text-left">
        <div class="flex items-center space-x-2">
          <span
            class="group px-2 py-1 text-lg font-bold tracking-widest uppercase transition-all duration-150 w-32 hover:w-52 bg-[darkcyan]"
          >
            <span
              class="transition-all duration-150 opacity-80 group-hover:opacity-100"
            >
              {{ t("view.homepage.academic") }}
            </span>
          </span>
          <span class="h-[1px] bg-white opacity-60 w-32"></span>
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
          <span
            class="text-lg font-bold tracking-widest uppercase group w-[22rem] transition-all duration-150 hover:w-96 px-2 py-1 bg-[darkcyan]"
          >
            <span
              class="transition-all duration-150 opacity-80 group-hover:opacity-100"
            >
              {{ t("view.homepage.languages") }} &
              {{ t("view.homepage.frameworks") }}
            </span>
          </span>
          <span class="h-[1px] bg-white opacity-60 w-32"></span>
        </div>
        <div v-if="store.skills.length" class="mt-3">
          <div class="flex flex-wrap">
            <SkillBox :array="store.skills.filter((e) => e.priority === 2)" />
          </div>
          <div class="flex flex-wrap">
            <SkillBox :array="store.skills.filter((e) => e.priority === 1)" />
          </div>
          <div class="flex flex-wrap">
            <SkillBox :array="store.skills.filter((e) => e.priority === 0)" />
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
            class="text-lg font-bold tracking-widest uppercase group w-32 transition-all duration-150 hover:w-48 px-2 py-1 bg-[darkcyan]"
          >
            <span
              class="transition-all duration-150 opacity-80 group-hover:opacity-100"
            >
              {{ t("view.homepage.libraries") }}
            </span>
          </span>
          <span class="h-[1px] bg-white opacity-60 w-32"></span>
        </div>
        <div v-if="store.libraries.length" class="mt-3">
          <div class="flex flex-wrap">
            <SkillBox
              :array="store.libraries.filter((e) => e.priority === 2)"
            />
          </div>
          <div class="flex flex-wrap">
            <SkillBox
              :array="store.libraries.filter((e) => e.priority === 1)"
            />
          </div>
          <div class="flex flex-wrap">
            <SkillBox
              :array="store.libraries.filter((e) => e.priority === 0)"
            />
          </div>
        </div>
        <div v-else>
          <n-skeleton :repeat="4" class="w-3/4" />
          <n-skeleton text class="w-2/3" />
        </div>
      </div>
    </div>
    <div class="flex flex-col items-start mt-6 mb-4 space-y-1">
      <div class="flex space-x-5">
        <div v-for="(item, index) in aboutMe.contacts" :key="index" class="">
          <a v-if="item.label !== 'Email'"  :href="item.url" target="_blank">
            <img
              :src="item.url_img"
              :class="`
              ${item.label === 'Github' ? 'invert' : ''}
               w-9 h-9 mb-1 grayscale opacity-40 hover:opacity-100 transition-all duration-150`"
            />
          </a>
          <div v-else>
            <n-popover trigger="click" :arrow-style="{background:'#020713'}" :content-style="{background: '#020713'}"	raw>
              <template #trigger>
                <img
                  :src="item.url_img"
                  class="mb-1 transition-all duration-150 cursor-pointer w-9 h-9 grayscale opacity-40 hover:opacity-100"
                />
              </template>
              <MailForm />
            </n-popover>
          </div>
        </div>
      </div>
      <span class="h-[1px] bg-white opacity-30 w-full"></span>
      <div class="flex pt-3 space-x-2">
        <span class="text-xs font-bold tracking-widest opacity-50">
          Powered by
        </span>
        <img
          v-for="(item, index) in languages"
          :key="index"
          class="w-4 h-4 mr-1 opacity-50"
          :src="getSKillImg(item)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from "/@/hooks/useI18n";
  import { aboutMe } from "./mock";
  import { fetchTextureMaps } from "/@/api/solarSystem";
  import { useHomePage } from "/@/store/homepage";
  import MailForm from "./mailForm.vue";
  import SkillBox from "./skillBox.vue";
  const store = useHomePage();
  const { t } = useI18n();
  const languages = [
    "vue",
    "ts",
    "tailwind",
    "pinia",
    "nestjs",
    "three",
    "naive",
  ];
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
