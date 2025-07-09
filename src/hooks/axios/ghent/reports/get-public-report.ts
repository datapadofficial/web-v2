import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../../common/create-axios-request";
import { Report } from "../../../../models/report";

const getPublicReportRequest = (
  publicCode: string,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<Report>({
    method: "GET",
    endpoint: `/reports/public/${publicCode}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();

export { getPublicReportRequest };