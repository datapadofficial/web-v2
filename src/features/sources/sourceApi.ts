import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "@/lib/create-axios-request";

// List all sources
export const listSourcesRequest = (config?: AxiosRequestConfig) =>
  createAxiosRequest<unknown>({
    method: "GET",
    endpoint: "/sources",
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();

// Get a specific source
export const getSourceRequest = (
  source: { _id: string },
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "GET",
    endpoint: `/sources/${source._id}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();

// Create a new source
export const createSourceRequest = (
  data: unknown,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "POST",
    endpoint: "/sources",
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(data);

// Update an existing source
export const updateSourceRequest = (
  source: unknown,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "PUT",
    endpoint: `/sources/${source._id}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(source);

// Delete a source
export const deleteSourceRequest = (
  source: { _id: string },
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "DELETE",
    endpoint: `/sources/${source._id}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();
