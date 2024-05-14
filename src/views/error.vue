<template>
  <div class="flex flex-col items-center justify-center w-full h-full"  @mousemove="onMouseHighlight">
     <div
      ref="mouseHighlight"
      class="fixed inset-0 z-30 transition duration-300 pointer-events-none"
    ></div>
    <div>
    
        <div class="stack" style="--stacks: 3;">
    <span style="--index: 0;">  <Icon class="!text-9xl opacity-60" icon="material-symbols:sad-tab-outline-rounded"/></span>
    <span style="--index: 1;">  <Icon class="!text-9xl opacity-60" icon="material-symbols:sad-tab-outline-rounded"/></span>
    <span style="--index: 2;">  <Icon class="!text-9xl opacity-60" icon="material-symbols:sad-tab-outline-rounded"/></span>
  </div>
    </div>
    <div class="text-lg font-bold tracking-widest uppercase opacity-60">look like you're lost</div>
    <div class="flex justify-center w-40 p-1 tracking-widest uppercase transition-all duration-200 cursor-pointer bg-cyan-400 hover:w-96" @click="redirect">
      let's head back
      </div>
  </div>
</template>
<script lang="ts" setup>
import {ref } from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()
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
  function redirect(){
router.push({path:'/'})
  }
  </script>

<style scoped>
.stack {
  display: grid;
  grid-template-columns: 1fr;
}

.stack span {
  font-weight: bold;
  grid-row-start: 1;
  grid-column-start: 1;
  font-size: 4rem;
  --stack-height: calc(100% / var(--stacks) - 1px);
  --inverse-index: calc(calc(var(--stacks) - 1) - var(--index));
  --clip-top: calc(var(--stack-height) * var(--index));
  --clip-bottom: calc(var(--stack-height) * var(--inverse-index));
  clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0);
  animation: stack 340ms cubic-bezier(.46,.29,0,1.24) 1 backwards calc(var(--index) * 120ms), glitch 2s ease infinite 2s alternate-reverse;
}

.stack span:nth-child(odd) { --glitch-translate: 8px; }
.stack span:nth-child(even) { --glitch-translate: -8px; }

@keyframes stack {
  0% {
    opacity: 0;
    transform: translateX(-50%);
    text-shadow: -2px 3px 0 red, 2px -3px 0 blue;
  };
  60% {
    opacity: 0.5;
    transform: translateX(50%);
  }
  80% {
    transform: none;
    opacity: 1;
    text-shadow: 2px -3px 0 red, -2px 3px 0 blue;
  }
  100% {
    text-shadow: none;
  }
}

@keyframes glitch {
  0% {
    text-shadow: -2px 3px 0 red, 2px -3px 0 blue;
    transform: translate(var(--glitch-translate));
  }
  2% {
    text-shadow: 2px -3px 0 red, -2px 3px 0 blue;
  }
  4%, 100% {  text-shadow: none; transform: none; }
}
</style>