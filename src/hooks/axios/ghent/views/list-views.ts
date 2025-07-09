import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../../common/create-axios-request";

const listViewsRequest = (config?: AxiosRequestConfig) =>
  createAxiosRequest<any>({
    method: "GET",
    endpoint: "/views",
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();

export { listViewsRequest };
