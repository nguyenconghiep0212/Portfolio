<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "/@/components/Header.vue";
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
