import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../../common/create-axios-request";

const getPotentialViewsRequest = (integration: string,sourceId: string, config?: AxiosRequestConfig) =>
  createAxiosRequest<any>({
    method: "GET",
    endpoint: `/integrations/${integration}/${sourceId}/potential-views`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(sourceId);

export { getPotentialViewsRequest };
