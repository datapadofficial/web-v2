import axios, { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../common/create-axios-request";

const additionalConfig: AxiosRequestConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_INSIGHTS_BASE_URL}/check-insights`,
  method: "POST",
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
};

const queryVectorInsightsRequest = createAxiosRequest<any>({
  endpoint: "",
  config: additionalConfig,
});

export { queryVectorInsightsRequest };
