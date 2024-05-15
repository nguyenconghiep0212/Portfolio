<template>
  <div class="relative w-full h-full">
    <div class="px-40 pt-[20vh]">
      <BaseFrame>
        <template v-slot:content>
          <div class="relative w-full h-full">
            <img class="w-full h-full opacity-60" :src="smct" />
          </div>
        </template>
        <template v-slot:annotation>
          <div ref="point2ref" class="rounded-full anchor top-40 left-20"></div>
        </template>
      </BaseFrame>
    </div>
    <div class="absolute top-0 left-0 z-50 w-full h-full">
      <div ref="point1ref" class="top-0 !w-max !h-max p-1 anchor left-0">
        test
      </div>
      <div id="line" class="bg-cyan-500"></div>
    </div>
  </div>
</template>
      

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { adjustLine } from "/@/utils/helper/connectDivs";
import smct from "/@/assets/images/smct.png";
import BaseFrame from "./BaseFrame.vue";

const point1ref = ref(null);
const point2ref = ref(null);

onMounted(() => {
  console.log(point2ref.value);
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