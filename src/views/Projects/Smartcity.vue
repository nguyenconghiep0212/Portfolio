<template>
  <div class="relative">
    <div class="px-[20%] mt-[20vh]">
      <BaseFrame>
        <div class="relative w-full h-full">
          <img
            class="w-full h-full opacity-60"
            src="https://res.cloudinary.com/dc7jd2eeu/image/upload/v1714763167/TownModel/b36sgcjfwfseo6awdcjm.jpg"
          />
        </div>
      </BaseFrame>
    </div>

    <!-- ANNOTATION -->
    <div class="absolute top-0 left-0 z-50 w-full h-full">
      <div id="content">
        <div ref="point1ref" class="top-0 rounded-full anchor left-10"></div>
        <div ref="point2ref" class="rounded-full anchor top-40 left-20"></div>
        <div id="line" class="bg-cyan-500"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { adjustLine } from "/@/utils/helper/connectDivs";
import BaseFrame from "./BaseFrame.vue";

const point1ref = ref(null);
const point2ref = ref(null);

onMounted(() => {
  adjustLine(point1ref.value, point2ref.value, document.getElementById("line"));
});
</script>

<style scoped>
.anchor {
  width: 10px;
  height: 10px;
  z-index: 11;
  position: absolute;
  background: black;
  border: 1px solid #06b6d4;
}
.anchor:after {
  content: no-close-quote;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  margin-left: -2px;
  margin-top: -2px;
}
#line {
  position: absolute;
  width: 1px;
  z-index: 10;
}
</style>