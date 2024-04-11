<template>
  <div class="h-full mx-8 my-3">
    <div class="grid grid-cols-2 gap-2">
      <div
        v-for="(item, index) in menu"
        :key="index"
        class="px-4 py-2 rounded-sm bg-slate-400"
        @click="redirect(item.to)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
const menu = [
  {
    title: "tresjs test",
    to: "tresjs",
  },
  {
    title: "Solar System",
    to: "solarSystem",
  },
  {
    title: "Playground",
    to: "playground",
  },
];

function redirect(to: string) {
  window.open(
    router.resolve({
      name: to,
    }).href,
    "_self"
  );
}
</script>
