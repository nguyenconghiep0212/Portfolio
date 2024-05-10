<template>
  <div class="h-full mx-[15vw] space-y-2 my-3">
    <!-- <div>{{ t("view.test") }}</div> -->
    <!-- HERO -->
    <div class="flex justify-between items-center h-[50vh]"></div>

    <!-- SKILL -->
    <div class="text-lg tracking-widest text-bold opacity-60">SKILLS</div>
    <div class="flex justify-center">
      <div class="grid w-1/2 grid-cols-5 gap-3">
        <div
          v-for="(item, index) in skills"
          :key="index"
          :class="`flex flex-col items-center justify-center bg-white rounded-lg bg-opacity-10 aspect-square ${}`"
        >
          <img :src="item.url" class="w-5 h-5" />
          <div class="tracking-widest truncate text-bold opacity-60">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>

<!-- LIBRARY -->
 <div class="text-lg tracking-widest text-bold opacity-60">LIBRARIES</div>
    <div class="flex justify-center">
      <div class="grid w-1/2 grid-cols-5 gap-3">
        <div
          v-for="(item, index) in libraries"
          :key="index"
          class="flex flex-col items-center justify-center bg-white rounded-lg bg-opacity-10 aspect-square"
        >
          <img :src="item.url" class="w-5 h-5" />
          <div class="tracking-widest truncate text-bold opacity-60">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>

<!-- PROJECT -->
<div class="text-lg tracking-widest text-bold opacity-60">PROJECTS</div>
    <div class="flex justify-center">
      <div class="grid w-1/2 grid-cols-5 gap-3">
        <div
          v-for="(item, index) in projects"
          :key="index"
          class="flex flex-col items-center justify-center bg-white rounded-lg bg-opacity-10 aspect-square"
        >
          <img :src="item.url" class="w-5 h-5" />
          <div class="tracking-widest truncate text-bold opacity-60">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>


    <!-- DEMO -->
    <div class="text-lg tracking-widest text-bold opacity-60">DEMO</div>
    <div class="grid grid-cols-2 gap-2">
      <div
        v-for="(item, index) in menu"
        :key="index"
        class="px-4 py-2 rounded-sm cursor-pointer bg-slate-400"
        @click="redirect(item.to)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from "vue-router";
   import { useI18n } from "/@/hooks/useI18n";
  import { computed, ref } from "vue";
  import {fetchTextureMaps} from '/@/api/solarSystem'

  const { t } = useI18n();
const libraries = ref([])
const projects = ref([])
const skills = ref([])
  const router = useRouter();
  const menu = computed(() => {
    return router.options.routes
      .map((e) => {
        if (!e.meta.hidden) {
          return {
            title: e.meta ? e.meta.title : e.name,
            to: e.name,
          };
        }
      })
      .filter((f) => f);
  }); 

  fetchSkills()
  fetchLibraries()
async function fetchSkills(){
  const params = {
    filter:[
      {
        key:'folder',
        value:'Skills'
      }
    ]
  }
  const res = await fetchTextureMaps(params)
  if(res){
    res.data.forEach((e: any) => {
      if(['js','ts','vue'].includes(e.key)){
        e.priority = 2
      }
      if(e.key === 'nodejs'){
 e.priority = 0
      }
    })
    skills.value = res.data
  }
}
async function fetchLibraries(){
  const params = {
    filter:[
      {
        key:'folder',
        value:'Libraries'
      }
    ]
  }
  const res = await fetchTextureMaps(params)
  if(res){
     res.data.forEach((e: any) => {
      if(['pinia','tailwind','axios','antd'].includes(e.key)){
        e.priority = 2
      }
      if(e.key === 'bootstrap'){
 e.priority = 0
      }
    })
    libraries.value = res.data
  }
}
  function redirect(to: string) {
    window.open(
      router.resolve({
        name: to,
      }).href,
      "_self"
    );
  }
</script>
