import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../../common/create-axios-request";

const createViewRequest = (view: any, config?: AxiosRequestConfig) =>
  createAxiosRequest<any>({
    method: "POST",
    endpoint: "/views/",
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(view);

export { createViewRequest };
