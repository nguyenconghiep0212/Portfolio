<template>
  <div>{{ t('view.test') }}</div>
  <Hello />
</template>

<script lang="ts" setup>
import Hello from "/@/components/Hello.vue";
import { useI18n } from "/@/hooks/useI18n";
const { t } = useI18n();
</script>
