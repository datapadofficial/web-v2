"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Source } from "@/types/source";
import {
  listSourcesRequest,
  getSourceRequest,
  createSourceRequest,
  updateSourceRequest,
  deleteSourceRequest,
} from "@/features/sources/sourceApi";

// Query Keys - keep these organized
export const sourceKeys = {
  all: ["sources"] as const,
  lists: () => [...sourceKeys.all, "list"] as const,
  list: (workspaceId: string) => [...sourceKeys.lists(), workspaceId] as const,
  details: () => [...sourceKeys.all, "detail"] as const,
  detail: (sourceId: string) => [...sourceKeys.details(), sourceId] as const,
};

// BASIC DATA FETCHING
export const useSources = (workspaceId: string, initialData?: Source[]) => {
  return useQuery({
    queryKey: sourceKeys.list(workspaceId),
    queryFn: async () => {
      const response = await listSourcesRequest(workspaceId);
      return response.data as Source[];
    },
    enabled: !!workspaceId,
    initialData, // Use data from get-me if available
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSource = (sourceId: string, workspaceId: string) => {
  return useQuery({
    queryKey: sourceKeys.detail(sourceId),
    queryFn: async () => {
      const response = await getSourceRequest(workspaceId, { _id: sourceId });
      return response.data as Source;
    },
    enabled: !!sourceId && !!workspaceId,
    staleTime: 5 * 60 * 1000,
  });
};

// SIMPLE MUTATIONS - No optimistic updates for now
export const useCreateSource = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Source>) => {
      const response = await createSourceRequest(workspaceId, data);
      return response.data as Source;
    },
    onSuccess: (newSource) => {
      // Just invalidate the list - let React Query refetch
      queryClient.invalidateQueries({ queryKey: sourceKeys.lists() });
      // Set the new source in cache
      queryClient.setQueryData(sourceKeys.detail(newSource._id!), newSource);
    },
  });
};

export const useUpdateSource = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      sourceId,
      updates,
    }: {
      sourceId: string;
      updates: Partial<Source>;
    }) => {
      const response = await updateSourceRequest(workspaceId, {
        _id: sourceId,
        ...updates,
      });
      return response.data as Source;
    },
    onSuccess: (updatedSource, { sourceId }) => {
      // Update the specific source
      queryClient.setQueryData(sourceKeys.detail(sourceId), updatedSource);
      // Invalidate lists to refresh
      queryClient.invalidateQueries({ queryKey: sourceKeys.lists() });
    },
  });
};

export const useDeleteSource = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sourceId: string) => {
      await deleteSourceRequest(workspaceId, { _id: sourceId });
      return sourceId;
    },
    onSuccess: (sourceId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: sourceKeys.detail(sourceId) });
      // Invalidate list to refresh
      queryClient.invalidateQueries({ queryKey: sourceKeys.lists() });
    },
  });
};
