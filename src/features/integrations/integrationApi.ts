import { AxiosRequestConfig } from "axios";
import { createAxiosRequest } from "@/lib/create-axios-request";

export const listIntegrationsRequest = (config?: AxiosRequestConfig) =>
  createAxiosRequest<object>({
    method: "GET",
    endpoint: "/integrations",
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();

export const runRawQueryRequestV2 = (
  integration: string,
  sourceId: string,
  body: object,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<object>({
    method: "POST",
    endpoint: `/integrations/${integration}/${sourceId}/run-raw-query`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(body);

export const testConnectionRequest = (
  integration: string,
  body: object,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<object>({
    method: "POST",
    endpoint: `/integrations/${integration}/test-connection`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(body);

export const getPotentialViewsRequest = (
  integration: string,
  sourceId: string,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<object>({
    method: "GET",
    endpoint: `/integrations/${integration}/${sourceId}/potential-views`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(sourceId);
