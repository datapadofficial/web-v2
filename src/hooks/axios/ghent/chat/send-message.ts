import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "../../common/create-axios-request";

const additionalConfig: AxiosRequestConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_GHENT_BASE_URL}`,
  method: "POST",
};

const sendMessageRequest = createAxiosRequest<any>({
  endpoint: "/chats/send-message",
  config: additionalConfig,
});

export { sendMessageRequest };
