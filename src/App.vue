<template>
  <n-config-provider :theme="darkTheme">
    <div class="main flex flex-col h-screen relative">
      <div class="w-full">
        <Header />
      </div>
      <div class="flex-1 overflow-y-auto">
        <router-view />
      </div>
    </div>
  </n-config-provider>
</template>

<script lang="ts" setup>
  import Header from "/@/components/Header.vue";
  import { darkTheme } from "naive-ui";
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
