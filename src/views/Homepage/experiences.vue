<template>
  <div>
    <!-- PROJECT -->
    <div class="flex flex-col">
      <div class="flex items-center justify-end space-x-2">
        <span class="h-[1px] bg-white opacity-60 w-1/2"></span>
        <span class="text-2xl font-bold tracking-widest uppercase opacity-60">
          Experiences
        </span>
      </div>
      <div class="flex flex-col mt-10 space-y-4">
        <div
          v-for="(item, index) in companies"
          :key="index"
          class="flex flex-col items-end justify-center w-full p-2 transition-all duration-150 ease-in-out rounded"
        >
          <div class="grid items-center w-full grid-cols-4 gap-4 mb-4">
            <div
              class="col-span-1 text-xs tracking-wide text-right uppercase opacity-60"
            >
              {{ item.dateOfService[0] }} - {{ item.dateOfService[1] }}
            </div>
            <div
              :ref="getComNameRef"
              class="flex items-center justify-end col-span-3 space-x-2 text-right cursor-pointer hover:text-sky-400"
              @mouseover="handleMouseOverCompany(index)"
              @mouseout="handleMouseOutCompany(index)"
            >
              <n-tag
                v-if="item.isStartUp"
                :bordered="false"
                round
                type="info"
                class="mr-2"
              >
                startup
              </n-tag>
              <a :href="item.url" target="_blank">
                <span
                  class="text-lg font-bold tracking-widest truncate font-inter"
                >
                  {{ item.name }}
                </span>
              </a>
              <Icon
                class="transition-all duration-150 opacity-40"
                icon="solar:map-arrow-right-bold-duotone"
              />
            </div>
          </div>
          <div
            v-for="(item2, index2) in item.projects"
            :key="index2"
            class="grid w-full grid-cols-4 gap-4 mb-2"
          >
            <div class="w-[inherit]"></div>

            <div class="flex flex-col items-end col-span-3 py-2">
              <div class="flex items-center space-x-2">
                <span
                  class="font-semibold tracking-widest truncate font-inter opacity-70"
                  >{{ item2.name }}</span
                >
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <Icon
                      class="transition-all duration-150 cursor-pointer opacity-70 hover:text-sky-400"
                      icon="solar:question-square-bold-duotone"
                    />
                  </template>
                  What've i done ?
                </n-tooltip>
              </div>
              <div class="flex flex-col items-end mr-6">
                <div class="opacity-50 text-end">
                  {{ item2.description }}
                </div>
                <div class="space-x-1 space-y-1 text-end">
                  <n-tag
                    v-for="(item3, index3) in item2.skills"
                    :key="index3"
                    round
                    :bordered="false"
                    type="info"
                  >
                    {{ getSKillName(item3) }}
                  </n-tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- DEMO -->
    <!-- <div class="text-lg font-bold tracking-widest opacity-60">DEMO</div>
    <div class="grid grid-cols-2 gap-2">
      <div
        v-for="(item, index) in menu"
        :key="index"
        class="px-4 py-2 rounded-sm cursor-pointer bg-slate-400"
        @click="redirect(item.to)"
      >
        {{ item.title }}
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from "vue-router";
  import { useI18n } from "/@/hooks/useI18n";
  import { computed, Ref, ref } from "vue";
  import { companies } from "./mock";
  import { useHomePage } from "/@/store/homepage";

  const store = useHomePage();
  const { t } = useI18n();
  const router = useRouter();
  const comNameRefs = ref<Ref[]>([]);
  const menu = computed<any>(() => {
    return router.options.routes
      .map((e: any) => {
        if (!e.meta.hidden) {
          return {
            title: e.meta ? e.meta.title : e.name,
            to: e.name,
          };
        }
      })
      .filter((f) => f);
  });

  function getComNameRef(event: Ref) {
    comNameRefs.value.push(event);
  }
  function handleMouseOverCompany(index: number) {
    const childRef = comNameRefs.value[index].children;
    childRef[childRef.length - 1].classList.add("-rotate-45");
    childRef[childRef.length - 1].classList.add("opacity-80");
    childRef[childRef.length - 1].classList.add("pl-1");
  }
  function handleMouseOutCompany(index: number) {
    const childRef = comNameRefs.value[index].children;
    childRef[childRef.length - 1].classList.remove("-rotate-45");
    childRef[childRef.length - 1].classList.remove("opacity-80");
    childRef[childRef.length - 1].classList.remove("pl-1");
  }
  function getSKillName(key: string): string {
    let found: any = store.skills.find((e: any) => e.key === key);
    if (!found) {
      found = store.libraries.find((e: any) => e.key === key);
    }
    return found ? found.customName : "N/A";
  }
  function redirect(to: string) {
    window.open(
      router.resolve({
        name: to,
      }).href,
      "_self"
    );
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
