import { AxiosRequestConfig } from "axios";
import {
  createAxiosRequest,
  createGhentConfig,
} from "@/lib/create-axios-request";

// List all sources
export const listSourcesRequest = (
  workspaceId: string,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "GET",
    endpoint: "/sources",
    config: {
      ...createGhentConfig(workspaceId),
      ...config,
    },
  })();

// Get a specific source
export const getSourceRequest = (
  workspaceId: string,
  source: { _id: string },
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "GET",
    endpoint: `/sources/${source._id}`,
    config: {
      ...createGhentConfig(workspaceId),
      ...config,
    },
  })();

// Create a new source
export const createSourceRequest = (
  workspaceId: string,
  data: unknown,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "POST",
    endpoint: "/sources",
    config: {
      ...createGhentConfig(workspaceId),
      ...config,
    },
  })(data);

// Update an existing source
export const updateSourceRequest = (
  workspaceId: string,
  source: { _id: string; [key: string]: unknown },
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "PUT",
    endpoint: `/sources/${source._id}`,
    config: {
      ...createGhentConfig(workspaceId),
      ...config,
    },
  })(source);

// Delete a source
export const deleteSourceRequest = (
  workspaceId: string,
  source: { _id: string },
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "DELETE",
    endpoint: `/sources/${source._id}`,
    config: {
      ...createGhentConfig(workspaceId),
      ...config,
    },
  })();
