import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../../common/create-axios-request";

const testConnectionRequest = (
  integration: string,
  body: any,
  config?: AxiosRequestConfig,
) =>
  createAxiosRequest<any>({
    method: "POST",
    endpoint: `/integrations/${integration}/test-connection`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(body);

export { testConnectionRequest };
