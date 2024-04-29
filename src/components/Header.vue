<template>
  <div class="flex justify-between">
    <div class="h-full flex items-center">
      <img :src="logo" class="w-12 cursor-pointer" @click="returnToHomepage" />
    </div>
    <div class="m-1">
      <Language />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Language from "/@/components/ChangeLanguage.vue";
  import logo from "/public/favicon.ico";
  import { useRouter } from "vue-router";
  const router = useRouter();
  function returnToHomepage() {
    window.open(
      router.resolve({
        name: "index",
      }).href,
      "_self"
    );
  }
</script>
