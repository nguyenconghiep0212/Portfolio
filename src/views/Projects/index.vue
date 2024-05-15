<template>
  <div class="w-full h-full" @mousemove="onMouseHighlight">
    <div
      ref="mouseHighlight"
      class="fixed inset-0 z-30 transition duration-300 pointer-events-none"
    ></div>

    <!-- TEMP -->
    <div class="flex flex-col items-center justify-center w-full h-full">
      <Icon
        class="!text-9xl opacity-60 animate-bounce"
        icon="solar:sledgehammer-bold-duotone"
      />
      <div class="mt-2 text-lg font-bold tracking-widest uppercase opacity-60">
        under construction . . .
      </div>
      <div
        class="flex justify-center w-40 p-1 tracking-widest uppercase transition-all duration-200 cursor-pointer bg-cyan-500 hover:w-96"
        @click="redirect"
      >
        let's head back
      </div>
    </div>
    <!-- <component :is="route.params.key" /> -->
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  const router = useRouter();
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

  function redirect() {
    router.push({ path: "/" });
  }
</script>
