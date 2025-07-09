"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Source } from "@/models/source";
import { listSourcesRequest } from "@/hooks/axios/sources/list-sources";
import { getSourceRequest } from "@/hooks/axios/sources/get-source";
import { createSourceRequest } from "@/hooks/axios/sources/create-source";
import { updateSourceRequest } from "@/hooks/axios/sources/update-source";
import { deleteSourceRequest } from "@/hooks/axios/sources/delete-source";

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
      const response = await listSourcesRequest();
      return response.data as Source[];
    },
    enabled: !!workspaceId,
    initialData, // Use data from get-me if available
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSource = (sourceId: string) => {
  return useQuery({
    queryKey: sourceKeys.detail(sourceId),
    queryFn: async () => {
      const response = await getSourceRequest({ _id: sourceId });
      return response.data as Source;
    },
    enabled: !!sourceId,
    staleTime: 5 * 60 * 1000,
  });
};

// SIMPLE MUTATIONS - No optimistic updates for now
export const useCreateSource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Source>) => {
      const response = await createSourceRequest(data);
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

export const useUpdateSource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      sourceId,
      updates,
    }: {
      sourceId: string;
      updates: Partial<Source>;
    }) => {
      const response = await updateSourceRequest({ _id: sourceId, ...updates });
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

export const useDeleteSource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sourceId: string) => {
      await deleteSourceRequest({ _id: sourceId });
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
