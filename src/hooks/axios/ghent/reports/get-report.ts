import { AxiosRequestConfig } from "axios";
import {
  createAxiosRequest,
  createGhentConfig,
} from "../../common/create-axios-request";

/**
 * Get a specific report from Ghent
 */
const getReportRequest = (
  workspaceId: string,
  reportId: string,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<any>({
    method: "GET",
    endpoint: `/reports/${reportId}`,
    config: {
      ...createGhentConfig(workspaceId),
      ...config,
    },
  })();

export { getReportRequest };
