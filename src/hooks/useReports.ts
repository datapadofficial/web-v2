"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Report } from "@/models/report";
import { listReportsRequest } from "@/hooks/axios/ghent/reports/list-reports";
import { getReportRequest } from "@/hooks/axios/ghent/reports/get-report";
import { createReportRequest } from "@/hooks/axios/ghent/reports/create-report";
import { updateReportRequest } from "@/hooks/axios/ghent/reports/update-report";
import { deleteReportRequest } from "@/hooks/axios/ghent/reports/delete-report";

// Query Keys - keep these organized
export const reportKeys = {
  all: ["reports"] as const,
  lists: () => [...reportKeys.all, "list"] as const,
  list: (workspaceId: string) => [...reportKeys.lists(), workspaceId] as const,
  details: () => [...reportKeys.all, "detail"] as const,
  detail: (reportId: string) => [...reportKeys.details(), reportId] as const,
};

// BASIC DATA FETCHING
export const useReports = (workspaceId: string, initialData?: Report[]) => {
  return useQuery({
    queryKey: reportKeys.list(workspaceId),
    queryFn: async () => {
      const response = await listReportsRequest(workspaceId);
      return response.data as Report[];
    },
    enabled: !!workspaceId,
    initialData, // Use data from get-me if available
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useReport = (reportId: string, workspaceId: string) => {
  return useQuery({
    queryKey: reportKeys.detail(reportId),
    queryFn: async () => {
      const response = await getReportRequest(workspaceId, reportId);
      return response.data as Report;
    },
    enabled: !!reportId && !!workspaceId,
    staleTime: 5 * 60 * 1000,
  });
};

// SIMPLE MUTATIONS - No optimistic updates for now
export const useCreateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      workspaceId,
      data,
    }: {
      workspaceId: string;
      data: { name: string; content: string };
    }) => {
      const response = await createReportRequest(workspaceId, data);
      return response.data as Report;
    },
    onSuccess: (newReport, { workspaceId }) => {
      // Just invalidate the list - let React Query refetch
      queryClient.invalidateQueries({ queryKey: reportKeys.list(workspaceId) });
      // Set the new report in cache
      queryClient.setQueryData(reportKeys.detail(newReport._id!), newReport);
    },
  });
};

export const useUpdateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reportId,
      updates,
    }: {
      reportId: string;
      updates: Partial<Report>;
    }) => {
      const response = await updateReportRequest(reportId, updates);
      return response.data as Report;
    },
    onSuccess: (updatedReport, { reportId }) => {
      // Update the specific report
      queryClient.setQueryData(reportKeys.detail(reportId), updatedReport);
      // Invalidate lists to refresh
      queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
    },
  });
};

export const useDeleteReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      workspaceId,
      reportId,
    }: {
      workspaceId: string;
      reportId: string;
    }) => {
      await deleteReportRequest(workspaceId, reportId);
      return { workspaceId, reportId };
    },
    onSuccess: (data, { workspaceId, reportId }) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: reportKeys.detail(reportId) });
      // Invalidate list to refresh
      queryClient.invalidateQueries({ queryKey: reportKeys.list(workspaceId) });
    },
  });
};
