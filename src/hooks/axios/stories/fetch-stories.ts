import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../common/create-axios-request";

const additionalConfig: AxiosRequestConfig = {
  // baseURL: `${process.env.NEXT_SERVER_BASE_URL}/api/ai`,
  baseURL: `${process.env.NEXT_PUBLIC_INSIGHTS_BASE_URL}`,
  method: "POST",
};

const fetchStoriesRequest = createAxiosRequest<any>({
    endpoint: "generate-stories",
    config: additionalConfig,
});

export { fetchStoriesRequest };
