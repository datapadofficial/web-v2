import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../../common/create-axios-request";

const exportReportRequest = (
  reportId: string, 
  type: string, 
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<any>({
    method: "GET",
    endpoint: `/reports/${reportId}/export?type=${type}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();

export { exportReportRequest };
