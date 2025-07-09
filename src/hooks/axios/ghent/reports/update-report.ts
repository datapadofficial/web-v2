import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../../common/create-axios-request";

const updateReportRequest = (reportId: string, report: any, config?: AxiosRequestConfig) =>
  createAxiosRequest<any>({
    method: "PUT",
    endpoint: `/reports/${reportId}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(report);

export { updateReportRequest }; 