import type { GlobEnvConfig } from "/#/config";

/**
 * Get the configuration file variable name
 * @param env
 */

export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig();
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase();
}

// Generate cache key according to version
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}__`.toUpperCase();
}

export function getAppEnvConfig() {
  const ENV = import.meta.env as unknown as GlobEnvConfig;

  const { VITE_GLOB_API_URL, VITE_GLOB_APP_SHORT_NAME, VITE_GLOB_UPLOAD_URL } =
    ENV;
  return {
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_UPLOAD_URL,
  };
}
export function getEnv(): string {
  return import.meta.env.MODE;
}
