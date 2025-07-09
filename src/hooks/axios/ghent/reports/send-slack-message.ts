import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../../common/create-axios-request";

const sendSlackMessage = (
  reportId: string,
  report: any,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<any>({
    method: "POST",
    endpoint: `/reports/send-slack`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(report);

export { sendSlackMessage };
