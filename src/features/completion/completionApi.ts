import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "@/lib/create-axios-request";

export const getCompletionRequest = (
  body: unknown,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "POST",
    endpoint: "/completions",
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(body);
