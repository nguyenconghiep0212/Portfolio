<template>
  <div class="my-2 rounded w-[inherit] h-full bg-[#39393c3a] relative">
    <div class="mx-3 py-1">
      <div class="flex justify-between items-center truncate">
        <div
          class="tracking-[8px] uppercase  truncate transition-all duration-100 text-bold opacity-60"
        >
          {{ store.selectedPlanetMission.name }}'s Missions
        </div>
        <div class="flex items-center">
          <Icon
            class="scale-150  opacity-40 cursor-pointer"
            icon="material-symbols:close-rounded"
            @click="closeMission"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineEmits } from "vue";
  import { useSolarSystem } from "/@/store/solarSystem";
  import { Icon } from "/@/uikits/Icon";

  const store = useSolarSystem();
  const emit = defineEmits(["close"]);
  function closeMission() {
    emit("close");
  }
</script>
