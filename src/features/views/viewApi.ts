import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "@/lib/create-axios-request";

// List all views
export const listViewsRequest = (config?: AxiosRequestConfig) =>
  createAxiosRequest<unknown>({
    method: "GET",
    endpoint: "/views",
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();

// Get a specific view
export const getViewRequest = (viewId: string, config?: AxiosRequestConfig) =>
  createAxiosRequest<unknown>({
    method: "GET",
    endpoint: `/views/${viewId}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();

// Create a new view
export const createViewRequest = (view: unknown, config?: AxiosRequestConfig) =>
  createAxiosRequest<unknown>({
    method: "POST",
    endpoint: "/views/",
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(view);

// Update an existing view
export const updateViewRequest = (
  viewId: string,
  view: unknown,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "PUT",
    endpoint: `/views/${viewId}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(view);

// Delete a view
export const deleteViewRequest = (
  viewId: string,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "DELETE",
    endpoint: `/views/${viewId}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();
