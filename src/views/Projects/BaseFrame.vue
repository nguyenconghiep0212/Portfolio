<template>
  <div class="relative flex w-full bg-zinc-900 aspect-video">
    <div class="absolute -top-5">
      <span class="italic opacity-40">
        *The display below does not represent the real product
      </span>
    </div>
    <div class="h-full w-[20%] bg-zinc-800">
      <div class="h-[10%]">
        <div class="h-full rounded-full aspect-square !bg-slate-500"></div>
      </div>
    </div>
    <div class="w-full h-[10%] bg-zinc-700"></div>
    <div
      class="absolute w-[-webkit-fill-available] h-[-webkit-fill-available] top-[10%] left-[20%]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>