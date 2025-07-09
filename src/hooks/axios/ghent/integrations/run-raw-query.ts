import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../../common/create-axios-request";

const runRawQueryRequestV2 = (integration: string,sourceId: string, body: any, config?: AxiosRequestConfig) =>
  createAxiosRequest<any>({
    method: "POST",
    endpoint: `/integrations/${integration}/${sourceId}/run-raw-query`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(body);

export { runRawQueryRequestV2 };
