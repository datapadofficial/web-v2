import { AxiosRequestConfig } from "axios";
import {
  createAxiosRequest,
  createGhentConfig,
} from "../../common/create-axios-request";

interface CreateReportParams {
  name: string;
  content: string;
  // other report properties
}

/**
 * Create a new report in Ghent
 */
const createReportRequest = (
  workspaceId: string,
  data: CreateReportParams,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<any>({
    method: "POST",
    endpoint: "/reports",
    config: {
      ...createGhentConfig(workspaceId),
      ...config,
    },
  })(data);

export { createReportRequest };
