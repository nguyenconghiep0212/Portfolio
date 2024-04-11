<template>
  <div class="flex justify-between">
    <div>{{ t("view.test") }}</div>
    <Language />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "/@/hooks/useI18n";
import Language from "/@/components/ChangeLanguage.vue";

const { t } = useI18n();
</script>
