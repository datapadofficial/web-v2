import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../../common/create-axios-request";

const updateViewRequest = (viewId: string, view: any, config?: AxiosRequestConfig) =>
  createAxiosRequest<any>({
    method: "PUT",
    endpoint: `/views/${viewId}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(view);

export { updateViewRequest };
