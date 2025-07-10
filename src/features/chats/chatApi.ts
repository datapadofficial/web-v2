import { AxiosRequestConfig } from "axios";
import {
  createAxiosRequest,
  createGhentConfig,
} from "@/lib/create-axios-request";

const additionalConfig: AxiosRequestConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_GHENT_BASE_URL}`,
  method: "POST",
};

// Send a message to a chat
export const sendMessageRequest = (
  workspaceId: string,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    endpoint: "/chats/send-message",
    config: {
      ...createGhentConfig(workspaceId),
      ...additionalConfig,
      ...config,
    },
  });

// List all chats
export const listChatsRequest = (
  workspaceId: string,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "GET",
    endpoint: "/chats",
    config: {
      ...createGhentConfig(workspaceId),
      ...config,
    },
  })();

// Get a specific chat
export const getChatRequest = (
  workspaceId: string,
  chatId: string,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "GET",
    endpoint: `/chats/${chatId}`,
    config: {
      ...createGhentConfig(workspaceId),
      ...config,
    },
  })();

// Delete a chat
export const deleteChatRequest = (
  workspaceId: string,
  chatId: string,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "DELETE",
    endpoint: `/chats/${chatId}`,
    config: {
      ...createGhentConfig(workspaceId),
      ...config,
    },
  })();
