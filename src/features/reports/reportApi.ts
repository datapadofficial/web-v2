import { AxiosRequestConfig } from "axios";
import {
  createAxiosRequest,
  createGhentConfig,
} from "@/lib/create-axios-request";
import { Report } from "@/types/report";

interface CreateReportParams {
  name: string;
  content: string;
  // other report properties
}

// List all reports for a workspace
export const listReportsRequest = (
  workspaceId: string,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "GET",
    endpoint: "/reports",
    config: {
      ...createGhentConfig(workspaceId),
      ...config,
    },
  })();

// Get a specific report
export const getReportRequest = (
  workspaceId: string,
  reportId: string,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "GET",
    endpoint: `/reports/${reportId}`,
    config: {
      ...createGhentConfig(workspaceId),
      ...config,
    },
  })();

// Create a new report
export const createReportRequest = (
  workspaceId: string,
  data: CreateReportParams,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "POST",
    endpoint: "/reports",
    config: {
      ...createGhentConfig(workspaceId),
      ...config,
    },
  })(data);

// Update an existing report
export const updateReportRequest = (
  reportId: string,
  report: unknown,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "PUT",
    endpoint: `/reports/${reportId}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(report);

// Delete a report
export const deleteReportRequest = (
  workspaceId: string,
  reportId: string,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "DELETE",
    endpoint: `/reports/${reportId}`,
    config: {
      ...createGhentConfig(workspaceId),
      ...config,
    },
  })();

// Preview a report
export const previewReportRequest = (
  report: unknown,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "POST",
    endpoint: `/reports/preview`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(report);

// Get a public report
export const getPublicReportRequest = (
  publicCode: string,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<Report>({
    method: "GET",
    endpoint: `/reports/public/${publicCode}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();

// Export a report
export const exportReportRequest = (
  reportId: string,
  type: string,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "GET",
    endpoint: `/reports/${reportId}/export?type=${type}`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })();

// Send report email
export const sendReportEmail = (
  reportId: string,
  report: unknown,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "POST",
    endpoint: `/reports/send-email`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(report);

// Send slack message
export const sendSlackMessage = (
  reportId: string,
  report: unknown,
  config?: AxiosRequestConfig
) =>
  createAxiosRequest<unknown>({
    method: "POST",
    endpoint: `/reports/send-slack`,
    config: {
      baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
      ...config,
    },
  })(report);
