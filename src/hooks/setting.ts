import type { GlobConfig } from "/#/config";

import { getAppEnvConfig } from "/@/utils/env";
export const useGlobSetting = (): Readonly<GlobConfig> => {
  const { VITE_GLOB_API_URL, VITE_GLOB_UPLOAD_URL } = getAppEnvConfig();

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    apiUrl: VITE_GLOB_API_URL,
    uploadUrl: VITE_GLOB_UPLOAD_URL,
  };
  return glob as Readonly<GlobConfig>;
};
