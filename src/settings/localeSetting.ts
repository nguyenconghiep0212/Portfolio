import type { LocaleSetting, LocaleType } from "/#/config";

export const LOCALE: { [key: string]: LocaleType } = {
  VI_VN: "vi",
  EN_US: "en",
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  // Locale
  locale: LOCALE.VI_VN,
  // Default locale
  fallback: LOCALE.VI_VN,
  // available Locales
  availableLocales: [LOCALE.VI_VN, LOCALE.EN_US],
}; 
// locale list
export const localeList = [
  {
    text: "Tiếng Việt",
    event: LOCALE.VI_VN,
  },
  {
    text: "English",
    event: LOCALE.EN_US,
  },
];
