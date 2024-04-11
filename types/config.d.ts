export type LocaleType = "en" | "ru" | "ja" | "ko" | "vi";

export interface LocaleSetting {
  showPicker: boolean;
  // Current language
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}

export interface GlobConfig {
  // Service interface url
  apiUrl: string;
  // Upload url
  uploadUrl?: string;
}
export interface GlobEnvConfig {
  // Service interface url
  VITE_GLOB_API_URL: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
}
