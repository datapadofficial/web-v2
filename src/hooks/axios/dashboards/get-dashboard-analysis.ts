import axios, { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../common/create-axios-request";

const additionalConfig: AxiosRequestConfig = {
  // baseURL: `${process.env.NEXT_SERVER_BASE_URL}/api/ai`,
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/ai`,
  method: "POST",
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
};

const getDashboardAnalysisRequest = createAxiosRequest<any>({
  endpoint: "",
  config: additionalConfig,
});

const getDashboardAnalysisRequest2 = async (body: any) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/ai`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export { getDashboardAnalysisRequest, getDashboardAnalysisRequest2 };
