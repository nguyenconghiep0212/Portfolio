import { http } from "/@/utils/axios";

interface Filter {
  key: string;
  value: string;
}

export const fetchSolarSystemTextureMaps = (filter: { filter: Filter[] }) => {
  return http.post(
    { url: "/api/texture-map/list-all", data: filter },
    { isTransformResponse: false, joinParamsToUrl: false }
  );
};

export const fetchSolarSystemPlanets = (filter: { filter: Filter[] }) => {
  return http.post(
    { url: "/api/planets/list-all", data: filter },
    { isTransformResponse: false, joinParamsToUrl: false }
  );
};
