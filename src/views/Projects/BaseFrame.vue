<template>
  <div class="relative w-full bg-zinc-900 aspect-video">
    <slot name="annotation"></slot>

    <div class="absolute -top-5">
      <span class="italic opacity-40">
        *The display below does NOT represent the real product
      </span>
    </div>
    <div class="w-full h-[10%] bg-zinc-700 absolute top-0 left-0 z-10"></div>
    <div
      class="absolute top-0 left-0 h-full w-[20%] pt-[5%] bg-zinc-800 z-10 overflow-hidden"
    >
      <div class="h-full">
        <div
          v-for="(item, index) in 6"
          :key="index"
          class="px-3 mt-4 text-left"
        >
          <n-skeleton text /> <n-skeleton text class="w-2/3" />
        </div>
      </div>
    </div>

    <div
      class="absolute w-[-webkit-fill-available] h-[-webkit-fill-available] top-[10%] left-[20%] blur-sm overflow-hidden"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>