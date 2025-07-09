import { AxiosRequestConfig } from "axios";
import {
  createAxiosRequest,
  createGhentConfig,
} from "../../common/create-axios-request";

/**
 * Get reports for a workspace from Ghent
 */
const listReportsRequest = (workspaceId: string, config?: AxiosRequestConfig) =>
  createAxiosRequest<any>({
    method: "GET",
    endpoint: "/reports",
    config: {
      ...createGhentConfig(workspaceId),
      ...config,
    },
  })();

export { listReportsRequest };
