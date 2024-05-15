<template>
  <n-config-provider :theme="darkTheme">
    <n-notification-provider>
      <div class="relative flex flex-col h-screen main">
        <div class="w-full">
          <Header />
        </div>
        <div class="flex-1 overflow-y-auto">
          <router-view />
        </div>
        <div class="absolute bottom-4 right-4">
          <n-button
            size="large"
            secondary
            circle
            type="info"
            @click="viewSrcCode"
          >
            <Icon icon="solar:code-outline" />
          </n-button>
        </div>
      </div>
    </n-notification-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
  import Header from "/@/components/Header.vue";
  import { darkTheme } from "naive-ui";

  function viewSrcCode() {
    window.open(
      "https://github1s.com/nguyenconghiep0212/Portfolio/blob/main/src/views/Homepage/index.vue",
      "_blank"
    );
  }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
  }
  body::-webkit-scrollbar {
    height: 4px;
    width: 4px;
  }

  body::-webkit-scrollbar-track {
    background: #25252599;
    border-radius: 12px;
  }

  body::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background: rgb(75, 75, 75);
  }
</style>
