import { http } from "/@/utils/axios";

export const fetchBuildings = (filter: {
  filter: {
    key: string;
    value: string;
  }[];
}) => {
  return http.post(
    { url: "/api/buildings/list-all", data: filter },
    { isTransformResponse: false, joinParamsToUrl: false }
  );
};
