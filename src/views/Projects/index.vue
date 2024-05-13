<template>
<div>
    HALLO
    <component :is="route.params.key" />
  </div>
</template>

<script lang="ts" setup>
 import {useRoute} from 'vue-router'
  
const route = useRoute()

console.log(route.params)
</script>
