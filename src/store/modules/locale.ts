import { defineStore } from "pinia";
import { LOCALE_KEY } from "/@/enums/cacheEnum";

import { localeSetting } from "/@/settings/localeSetting";
import { LocaleSetting } from "/#/config";
import { createLocalStorage } from "/@/cache";
import { computed } from "vue";

const ls = createLocalStorage();

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

export const useLocaleStore = defineStore("localeStore", () => {
  const localInfo: LocaleSetting = lsLocaleSetting;
  const locale = computed(() => {
    return localInfo.locale;
  });

  return {
    localInfo,
    locale,
  };
});
