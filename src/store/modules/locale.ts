import { defineStore } from "pinia";
import { LOCALE_KEY } from "/@/enums/cacheEnum";

import { localeSetting } from "/@/settings/localeSetting";
import { LocaleSetting } from "/#/config";
import { createLocalStorage } from "/@/cache";
import { computed } from "vue";

const ls = createLocalStorage();

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

export const useLocaleStore = defineStore("localeStore", () => {
  let localInfo: LocaleSetting = lsLocaleSetting;
  const locale = computed(() => {
    return localInfo.locale;
  });

  function setLocaleInfo(info: Partial<LocaleSetting>) {
    localInfo = { ...localInfo, ...info };
    ls.set(LOCALE_KEY, localInfo);
  }

  return {
    localInfo,
    locale,
    setLocaleInfo,
  };
});
