"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Chat } from "@/types/chat";
import {
  listChatsRequest,
  getChatRequest,
  deleteChatRequest,
} from "@/features/chats/chatApi";

// Query Keys - keep these organized
export const chatKeys = {
  all: ["chats"] as const,
  lists: () => [...chatKeys.all, "list"] as const,
  list: (workspaceId: string) => [...chatKeys.lists(), workspaceId] as const,
  details: () => [...chatKeys.all, "detail"] as const,
  detail: (chatId: string) => [...chatKeys.details(), chatId] as const,
};

// BASIC DATA FETCHING
export const useChats = (workspaceId: string, initialData?: Chat[]) => {
  return useQuery({
    queryKey: chatKeys.list(workspaceId),
    queryFn: async () => {
      const response = await listChatsRequest();
      return response.data as Chat[];
    },
    enabled: !!workspaceId,
    initialData, // Use data from get-me if available
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useChat = (chatId: string) => {
  return useQuery({
    queryKey: chatKeys.detail(chatId),
    queryFn: async () => {
      const response = await getChatRequest(chatId, {});
      return response.data as Chat;
    },
    enabled: !!chatId,
    staleTime: 5 * 60 * 1000,
  });
};

// SIMPLE MUTATIONS - Only delete is available for chats
export const useDeleteChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (chatId: string) => {
      await deleteChatRequest(chatId, {});
      return chatId;
    },
    onSuccess: (chatId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: chatKeys.detail(chatId) });
      // Invalidate list to refresh
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() });
    },
  });
};
