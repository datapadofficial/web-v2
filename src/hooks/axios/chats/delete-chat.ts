import { Chat } from "../../../models/chat";
import { createAxiosRequest } from "../common/create-axios-request";
import { AxiosRequestConfig } from "axios";

export const deleteChatRequest = (chatId: string, config: AxiosRequestConfig) =>
  createAxiosRequest<Chat>({
    method: "DELETE",
    endpoint: `chats/${chatId}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();
