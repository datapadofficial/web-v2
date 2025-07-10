"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getMeRequest, UserData } from "@/features/users/userApi";
import { useAuth } from "@/providers/AuthProvider";

export const workspaceKeys = {
  all: ["workspaces"] as const,
  me: (workspaceId?: string) =>
    [...workspaceKeys.all, "me", workspaceId] as const,
};

export const useWorkspaces = (explicitWorkspaceId?: string) => {
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const params = useParams();

  // Determine workspace ID priority: explicit > URL > undefined (let backend decide)
  const urlWorkspaceId = params?.workspaceId as string;
  const workspaceId = explicitWorkspaceId || urlWorkspaceId || undefined;

  const query = useQuery({
    queryKey: workspaceKeys.me(workspaceId),
    queryFn: async () => {
      const response = await getMeRequest(workspaceId);
      return response.data as UserData;
    },
    enabled: !!firebaseUser && !authLoading,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

  return {
    ...query,
    user: query.data?.user,
    workspaces: query.data?.workspaces || [],
    currentWorkspace: query.data?.workspace,
    reports: query.data?.reports || [],
    sources: query.data?.sources || [],
    chats: query.data?.chats || [],
  };
};
