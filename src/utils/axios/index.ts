import type { AxiosResponse } from "axios";
import { clone } from "lodash-es";
import type { RequestOptions, Result } from "/#/axios";
import type { AxiosTransform, CreateAxiosOptions } from "./axiosTransform";
import { VAxios } from "./Axios";
import { checkStatus } from "./checkStatus";
import { useGlobSetting } from "/@/hooks/setting";
import { RequestEnum, ResultEnum, ContentTypeEnum } from "/@/enums/httpEnum";
import { isString } from "/@/utils/is";
// import { getToken } from "/@/utils/auth";
import { setObjToUrlParams, deepMerge } from "/@/utils";
import { useI18n } from "/@/hooks/useI18n";
import { joinTimestamp, formatRequestDate } from "./helper";
import { useMessage } from "naive-ui";

const globSetting = useGlobSetting();
const createMessage = useMessage();
const transform: AxiosTransform = {
  transformRequestHook: (
    res: AxiosResponse<Result>,
    options: RequestOptions
  ) => {
    const { t } = useI18n();
    const { isTransformResponse, isReturnNativeResponse } = options;
    if (isReturnNativeResponse) {
      return res;
    }
    if (!isTransformResponse) {
      return res.data;
    }

    const { data } = res;
    if (!data) {
      throw new Error(t("sys.api.apiRequestFailed"));
    }
    const { statusCode, result, message } = data;

    const hasSuccess =
      data &&
      Reflect.has(data, "statusCode") &&
      statusCode === ResultEnum.SUCCESS;
    if (hasSuccess) {
      return result;
    }

    let timeoutMsg = "";
    switch (statusCode) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = t("sys.api.timeoutMessage");

        break;
      default:
        if (message) {
          timeoutMsg = message;
        }
    }

    createMessage.error(timeoutMsg);

    throw new Error(timeoutMsg || t("sys.api.apiRequestFailed"));
  },

  beforeRequestHook: (config, options) => {
    const { apiUrl, joinParamsToUrl, formatDate, joinTime = true } = options;

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        config.params = Object.assign(
          params || {},
          joinTimestamp(joinTime, false)
        );
      } else {
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (
          Reflect.has(config, "data") &&
          config.data &&
          Object.keys(config.data).length > 0
        ) {
          config.data = data;
          config.params = params;
        } else {
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          );
        }
      } else {
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  requestInterceptors: (config, options) => {
    // const token = getToken();
    // if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
    //   (config as Recordable).headers.Authorization =
    //     options.authenticationScheme
    //       ? `${options.authenticationScheme} ${token}`
    //       : token;
    // }
    return config;
  },

  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  responseInterceptorsCatch: (error: any) => {
    const { t } = useI18n();
    const { response, statusCode, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || "none";
    const msg: string = response?.data?.error?.message ?? "";
    const err: string = error?.toString?.() ?? "";
    let errMessage = "";

    try {
      if (statusCode === "ECONNABORTED" && message.indexOf("timeout") !== -1) {
        errMessage = t("sys.api.apiTimeoutMessage");
      }
      if (err?.includes("Network Error")) {
        errMessage = t("sys.api.networkExceptionMsg");
      }

      if (errMessage) {
        createMessage.error(errMessage);

        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }

    checkStatus(error?.response?.status, msg, errorMessageMode);
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: "",
        timeout: 180 * 1000,
        // baseURL: globSetting.apiUrl,

        headers: { "Content-Type": ContentTypeEnum.JSON },
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        transform: clone(transform),
        requestOptions: {
          isReturnNativeResponse: false,
          isTransformResponse: true,
          joinParamsToUrl: false,
          formatDate: true,
          errorMessageMode: "message",
          apiUrl: globSetting.apiUrl,
          joinTime: true,
          ignoreCancelToken: true,
          withToken: true,
        },
      },
      opt || {}
    )
  );
}
export const http = createAxios();
