<template>
  <div class="flex justify-between py-1 mx-[15vw] h-[5vh] items-center">
    <div class="flex items-center h-full">
      <div
        class="flex space-x-1 text-lg font-bold tracking-widest truncate cursor-pointer opacity-60"
        @click="returnToHomepage"
      >
        <span>MY PORTFOLIO</span>
      </div>
      <!-- <img :src="logo" class="w-12 cursor-pointer" @click="returnToHomepage" /> -->
    </div>
    <div class="flex items-center">
      <Language />
      <n-divider class="!bg-white opacity-40" vertical />
      <n-tooltip trigger="hover">
        <template #trigger>
          <div class="flex items-center opacity-40">
            <Icon class="scale-150 cursor-pointer" icon="solar:list-bold" />
          </div>
        </template>
        <div>aaa</div>
      </n-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Language from "/@/components/ChangeLanguage.vue";
  // import logo from "/public/favicon.ico";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const options = [
    {
      label: "Introduction",
      key: "hero",
    },
  ];

  function returnToHomepage() {
    window.open(
      router.resolve({
        name: "index",
      }).href,
      "_self"
    );
  }

  function handleMoveToSection(data) {
    console.log(data);
  }
</script>
