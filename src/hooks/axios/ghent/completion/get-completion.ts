import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../../common/create-axios-request";

const getCompletionRequest = (body: any, config?: AxiosRequestConfig) =>
  createAxiosRequest<any>({
    method: "POST",
    endpoint: "/completions",
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(body);

export { getCompletionRequest };
