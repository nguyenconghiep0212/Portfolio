<template>
  <div>
    <!-- PROJECT -->
    <div class="flex flex-col">
      <div class="flex items-center justify-start space-x-4">
        <span
          class="text-2xl font-bold tracking-widest uppercase w-72 px-2 py-1 bg-[darkcyan]"
        >
          <span class="opacity-80">{{ t("view.homepage.experiences") }} </span>
        </span>
        <span class="h-[1px] bg-white opacity-60 w-full"></span>
      </div>
      <div class="flex flex-col mt-8 space-y-4">
        <div
          v-for="(item, index) in companies"
          :key="index"
          class="flex flex-col items-end justify-center w-full p-2 transition-all duration-150 ease-in-out rounded"
        >
          <div class="grid items-center w-full grid-cols-4 gap-4 mb-4">
            <div
              class="flex items-start justify-start col-span-3 px-2 py-1 -ml-2 space-x-2 text-right truncate bg-opacity-50 cursor-pointer group hover:text-sky-400 bg-sky-500"
            >
              <a :href="item.url" target="_blank">
                <div class="flex flex-col">
                  <div class="text-lg font-bold tracking-widest font-inter">
                    {{ item.name }}
                  </div>
                  <div class="text-left opacity-70">
                    {{ item.roles }}
                  </div>
                </div>
              </a>
              <n-tag
                v-if="item.isStartUp"
                :bordered="false"
                round
                type="primary"
                size="small"
                class="mr-2 mt-[2px]"
              >
                startup
              </n-tag>
              <Icon
                class="mt-[7px] transition-all duration-150 opacity-40 group-hover:-rotate-45 group-hover:opacity-80 group-hover:pl-1"
                icon="solar:map-arrow-right-bold-duotone"
              />
            </div>
            <div
              class="flex items-start justify-end h-full col-span-1 text-xs tracking-wide text-right uppercase opacity-60"
            >
              {{ item.dateOfService[0] }} - {{ item.dateOfService[1] }}
            </div>
          </div>
          <div
            v-for="(item2, index2) in item.projects"
            :key="index2"
            class="group grid w-full grid-cols-4 gap-4 mb-4 py-2 transition-all duration-150 cursor-pointer rounded hover:bg-slate-800/50 hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]"
            @click="goToApps(item2)"
          >
            <div class="flex flex-col items-start col-span-3 py-2">
              <div class="flex items-center">
                <span
                  class="font-semibold tracking-widest truncate group-hover:opacity-100 group-hover:text-sky-400 font-inter opacity-70"
                >
                  {{ item2.name }}
                </span>
                <n-tooltip v-if="item2.isKeyMem" trigger="hover">
                  <template #trigger>
                    <Icon
                      class="ml-2 mb-[2px] text-yellow-300"
                      icon="solar:star-bold-duotone"
                    />
                  </template>
                  Key Member
                </n-tooltip>
              </div>
              <div class="flex flex-col items-start space-y-2">
                <div class="opacity-50 text-start">
                  {{ item2.description }}
                </div>
                <div class="flex space-x-2 text-end">
                  <!-- <n-tag
                    v-for="(item3, index3) in item2.skills"
                    :key="index3"
                    round
                    size="small"
                    :bordered="false"
                    type="info"
                  >
                    {{ getSKillName(item3) }}
                  </n-tag> -->
                  <img
                    v-for="(item3, index3) in item2.skills"
                    :key="index3"
                    class="w-4 h-4 mr-1 transition-all duration-150 opacity-40 group-hover:w-5 group-hover:h-5 group-hover:opacity-100"
                    :src="getSKillImg(item3)"
                  />
                </div>
              </div>
            </div>
            <div class="w-[inherit]"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- DEMO -->
    <div class="flex flex-col mt-12">
      <div class="flex items-center justify-start space-x-2">
        <span
          class="text-2xl font-bold tracking-widest uppercase w-max px-2 py-1 bg-[darkcyan]"
        >
          <span class="opacity-80">Three.js</span>
        </span>
        <span class="h-[1px] bg-white opacity-60 w-full"></span>
      </div>
      <div class="flex flex-col mt-8 space-y-4">
        <div
          v-for="(item, index) in menu"
          :key="index"
          class="py-2 transition-all duration-150 rounded-sm cursor-pointer group hover:bg-slate-800/50 hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]"
          @click="redirect(item.to)"
        >
          <div class="flex flex-col items-start col-span-3 py-2">
            <div class="flex items-center space-x-2">
              <span
                class="text-lg font-bold tracking-widest truncate transition-all duration-150 font-inter group-hover:text-sky-400"
              >
                {{ item.title }}
              </span>
              <Icon
                class="transition-transform duration-1000 opacity-70 group-hover:opacity-100 group-hover:text-sky-400 group-hover:rotate-[360deg]"
                :icon="item.icon"
              />
            </div>
            <div class="opacity-50 text-start">
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end pt-3 space-x-2">
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
</template>

<script lang="ts" setup>
  import { useRouter } from "vue-router";
  import { useI18n } from "/@/hooks/useI18n";
  import { computed } from "vue";
  import { companies } from "./mock";
  import { useHomePage } from "/@/store/homepage";

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
  const router = useRouter();
  const menu = computed<any>(() => {
    return router.options.routes
      .map((e: any) => {
        if (!e.meta.hidden) {
          return {
            icon: e.meta.icon,
            description: e.meta.description,
            title: e.meta ? e.meta.title : e.name,
            to: e.name,
          };
        }
      })
      .filter((f) => f);
  });

  // function getSKillName(key: string): string {
  //   let found: any = store.skills.find((e: any) => e.key === key);
  //   if (!found) {
  //     found = store.libraries.find((e: any) => e.key === key);
  //   }
  //   return found ? found.customName : "N/A";
  // }

  function goToApps(data: any) {
    if (data.key === "onthedesk") {
      window.open("https://onthedesk.vn", "_blank");
    } else {
      router.push({
        name: "projects",
        params: { key: data.key },
      });
    }
  }

  function redirect(to: string) {
    window.open(
      router.resolve({
        name: to,
      }).href,
      "_self"
    );
  }
  function getSKillImg(key: string): string {
    let found: any = store.skills.find((e: any) => e.key === key);
    if (!found) {
      found = store.libraries.find((e: any) => e.key === key);
    }
    return found ? found.url : "N/A";
  }
</script>

<style scoped>
  .my-name {
    font-family: "Inter", sans-serif;
  }
  .my-title {
    font-family: "Inter", sans-serif;
  }
</style>
