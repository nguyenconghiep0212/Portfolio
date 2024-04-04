<template>
  <div>{{ t("view.test") }}</div>
  <Hello />
</template>

<script lang="ts" setup>
import Hello from "/@/components/Hello.vue";
import { useI18n } from "/@/hooks/useI18n";
import { getPokemon } from "/@/api";
const { t } = useI18n();
test();
async function test() {
  const res = await getPokemon();
  if (res) {
    console.log(res);
  }
}
</script>
