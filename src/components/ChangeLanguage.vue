<template>
  <n-dropdown trigger="hover" :options="localeList" @select="toggleLocale">
    <div class=" opacity-40">
      <span class="flex items-center cursor-pointer space-x-1">
        <Icon icon="ion:language-sharp" />
        <div class="tracking-widest  truncate transition-all duration-100 text-bold">{{ getLocaleText }}</div>
      </span>
    </div>
  </n-dropdown>
</template>
<script lang="ts" setup>
  import type { LocaleType } from "/#/config";
  import { Icon } from "/@/uikits/Icon";
  import { useLocale } from "/@/locales/useLocale";
  import { computed, ref, unref } from "vue";

  const props = defineProps({
    /**
     * Whether to refresh the interface when changing
     */
    reload: { type: Boolean },
  });
  const { changeLocale, getLocale } = useLocale();
  const selectedKeys = ref(unref(getLocale));
  const localeList = [
    {
      label: "Tiếng Việt",
      key: "vi",
    },
    {
      label: "English",
      key: "en",
    },
  ];

  async function toggleLocale(event: LocaleType | string) {
    selectedKeys.value = event;
    await changeLocale(event as LocaleType);

    props.reload && location.reload();
  }
  const getLocaleText = computed(() => {
    if (!selectedKeys.value) {
      return "";
    }
    return localeList.find((item) => item.key === selectedKeys.value)?.key;
  });
</script>
