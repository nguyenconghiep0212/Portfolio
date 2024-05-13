<template>
  <div class="w-full h-full"  @mousemove="onMouseHighlight">
    <div
      ref="mouseHighlight"
      class="fixed inset-0 z-30 transition duration-300 pointer-events-none"
    ></div>
    <component :is="route.params.key" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
import { useRoute } from "vue-router";

  const route = useRoute();
  const mouseHighlight = ref<any>(null);
  function onMouseHighlight(event: MouseEvent) {
    if (mouseHighlight.value)
      if (mouseHighlight.value.style)
        mouseHighlight.value.style.background = `radial-gradient(
          1000px at ${event.clientX}px ${event.clientY}px,
          rgba(29, 78, 216, 0.15),
          transparent 80%
        )`;
  }
</script>
