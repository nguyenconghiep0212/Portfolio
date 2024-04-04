import { http } from "/@/utils/axios";

export const getPokemon = () => {
  return http.post(
    { url: "/api/packages/list" },
    { isTransformResponse: false, joinParamsToUrl: false }
  );
};
