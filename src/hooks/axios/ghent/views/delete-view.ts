import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../../common/create-axios-request";

const deleteViewRequest = (viewId: string, config?: AxiosRequestConfig) =>
  createAxiosRequest<any>({
    method: "DELETE",
    endpoint: `/views/${viewId}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();

export { deleteViewRequest };
