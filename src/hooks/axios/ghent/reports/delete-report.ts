import { AxiosRequestConfig } from "axios";
import {
  createAxiosRequest,
  createGhentConfig,
} from "../../common/create-axios-request";

const deleteReportRequest = (
  workspaceId: string,
  reportId: string,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<any>({
    method: "DELETE",
    endpoint: `/reports/${reportId}`,
    config: {
      ...createGhentConfig(workspaceId),
      ...config,
    },
  })();

export { deleteReportRequest };
