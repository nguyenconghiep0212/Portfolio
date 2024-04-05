<template>
  <div class="h-full bg-gray-600">
     <TresCanvas clear-color="black" window-size>
      <TresPerspectiveCamera />
      <OrbitControls />
      <TresMesh>
        <TresSphereGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
      <TresGridHelper />
    </TresCanvas>
  </div>
</template>

<script lang="ts" setup>
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";

</script>
