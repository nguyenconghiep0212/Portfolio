<template>
  <div>
    <!-- PROJECT -->
    <div class="flex flex-col">
      <div class="flex items-center justify-end space-x-2">
        <span class="h-[1px] bg-white opacity-60 w-1/2"></span>
        <span class="text-2xl tracking-widest uppercase text-bold opacity-60">
          Projects
        </span>
      </div>
      <div class="flex flex-col mt-10 space-y-4">
        <div
          v-for="(item, index) in projects"
          :key="index"
          class="flex flex-col items-end justify-center w-full p-2 transition-all duration-150 ease-in-out cursor-pointer hover:bg-white hover:bg-opacity-10"
        >
          <div class="grid grid-cols-4 gap-2">
            <div class="col-span-3">
              <div class="tracking-widest truncate text-bold opacity-60">
                {{ item.name }}
              </div>
            </div>
            <div>zzzzzz</div>
          </div>
        </div>
      </div>
    </div>

    <!-- DEMO -->
    <!-- <div class="text-lg tracking-widest text-bold opacity-60">DEMO</div>
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
  import { computed } from "vue";
  import { projects } from "./mock";

  const { t } = useI18n();
  const router = useRouter();
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
