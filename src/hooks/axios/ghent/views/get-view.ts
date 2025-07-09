import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../../common/create-axios-request";

const getViewRequest = (viewId: string, config?: AxiosRequestConfig) =>
  createAxiosRequest<any>({
    method: "GET",
    endpoint: `/views/${viewId}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();

export { getViewRequest };
