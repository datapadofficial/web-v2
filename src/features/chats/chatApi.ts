import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "@/lib/create-axios-request";

const additionalConfig: AxiosRequestConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_GHENT_BASE_URL}`,
  method: "POST",
};

// Send a message to a chat
export const sendMessageRequest = createAxiosRequest<unknown>({
  endpoint: "/chats/send-message",
  config: additionalConfig,
});

// List all chats
export const listChatsRequest = (config?: AxiosRequestConfig) =>
  createAxiosRequest<unknown>({
    method: "GET",
    endpoint: "/chats",
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();

// Get a specific chat
export const getChatRequest = (chatId: string, config?: AxiosRequestConfig) =>
  createAxiosRequest<unknown>({
    method: "GET",
    endpoint: `/chats/${chatId}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();

// Delete a chat
export const deleteChatRequest = (
  chatId: string,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "DELETE",
    endpoint: `/chats/${chatId}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();
