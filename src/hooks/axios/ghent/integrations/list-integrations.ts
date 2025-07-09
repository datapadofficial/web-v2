import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../../common/create-axios-request";

const listIntegrationsRequest = (config?: AxiosRequestConfig) =>
  createAxiosRequest<any>({
    method: "GET",
    endpoint: "/integrations",
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();

export { listIntegrationsRequest };
