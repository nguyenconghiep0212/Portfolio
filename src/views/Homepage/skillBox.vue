<template>
  <div
    v-for="(item, index) in prop.array"
    :key="index"
    :class="`mt-2 mr-2 w-20 flex flex-col items-center justify-center bg-white rounded-lg bg-opacity-10 aspect-square  ${
      item.priority === 2
        ? 'border-[#ffd70085] border-2 border-solid'
        : item.priority === 1
        ? 'border-[#c0c0c0a6] border-2 border-solid'
        : ''
    } `"
  >
    <img :src="item.url" class="w-5 h-5 mb-1" />
    <div class="text-[11px] tracking-widest opacity-60">
      {{ item.customName }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  const prop = defineProps({
    array: {
      type: Array,
      default: () => [],
    },
  });
</script>
