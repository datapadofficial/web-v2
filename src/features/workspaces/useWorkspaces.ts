"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { getMeRequest, UserData } from "@/features/users/userApi";
import { useAuth } from "@/providers/AuthProvider";

export const workspaceKeys = {
  all: ["workspaces"] as const,
  me: (workspaceId?: string) =>
    [...workspaceKeys.all, "me", workspaceId] as const,
};

const getStoredWorkspaceId = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("workspaceId");
};

const storeWorkspaceId = (workspaceId: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("workspaceId", workspaceId);
  }
};

export const useWorkspaces = (explicitWorkspaceId?: string) => {
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const params = useParams();

  // Determine workspace ID priority: explicit > URL > localStorage
  const urlWorkspaceId = params?.workspaceId as string;
  const storedWorkspaceId = getStoredWorkspaceId();
  const workspaceId =
    explicitWorkspaceId || urlWorkspaceId || storedWorkspaceId || undefined;

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

  // Auto-save workspace ID when data loads
  useEffect(() => {
    if (query.data?.workspace?._id) {
      storeWorkspaceId(query.data.workspace._id);
    }
  }, [query.data?.workspace?._id]);

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
