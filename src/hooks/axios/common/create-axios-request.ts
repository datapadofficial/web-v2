import { AxiosResponse, AxiosRequestConfig } from "axios";
import { axiosClient, createGhentRequest } from "./axios-client";

type APIResponse<T> = AxiosResponse<T>;

interface RequestHandlerOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  config?: AxiosRequestConfig;
}

// Helper function to create Ghent request config
export const createGhentConfig = (workspaceId?: string): AxiosRequestConfig => {
  return createGhentRequest(workspaceId);
};

const createAxiosRequest = <T>({
  method = "POST",
  endpoint,
  config: defaultConfig = {},
}: RequestHandlerOptions): ((
  body?: any,
  config?: AxiosRequestConfig
) => Promise<APIResponse<T>>) => {
  if (method === "GET") {
    return async (config = {}) => {
      const response = await axiosClient.get<T>(endpoint, {
        ...defaultConfig,
        ...config,
      });
      return response;
    };
  }
  if (method === "DELETE") {
    return async (config = {}) => {
      const response = await axiosClient.delete<T>(endpoint, {
        ...defaultConfig,
        ...config,
      });
      return response;
    };
  }

  if (method === "PUT") {
    return async (body, config = {}) => {
      const response = await axiosClient.put<T>(endpoint, body, {
        ...defaultConfig,
        ...config,
      });
      return response;
    };
  }

  return async (body, config = {}) => {
    const response = await axiosClient.post<T>(endpoint, body, {
      ...defaultConfig,
      ...config,
    });
    return response;
  };
};

export { createAxiosRequest };
export type { APIResponse };
