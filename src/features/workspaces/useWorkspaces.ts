"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { getMeRequest, UserData } from "@/features/users/userApi";
import { useAuth } from "@/providers/AuthProvider";

// ========================================
// Query Keys
// ========================================

export const workspaceKeys = {
  all: ["workspaces"] as const,
  me: (workspaceId?: string) =>
    [...workspaceKeys.all, "me", workspaceId] as const,
};

// ========================================
// LocalStorage Utilities
// ========================================

const getLastWorkspaceId = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("workspaceId");
};

const saveLastWorkspaceId = (workspaceId: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("workspaceId", workspaceId);
  }
};

const clearWorkspacePreferences = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("workspaceId");
  }
};

// ========================================
// Navigation Utilities
// ========================================

export const useWorkspaceNavigation = () => {
  const router = useRouter();

  const switchWorkspace = useCallback(
    (workspaceId: string) => {
      router.push(`/workspaces/${workspaceId}`);
    },
    [router]
  );

  const goToWorkspaces = useCallback(() => {
    router.push("/workspaces");
  }, [router]);

  const goToWelcome = useCallback(() => {
    router.push("/welcome");
  }, [router]);

  return {
    switchWorkspace,
    goToWorkspaces,
    goToWelcome,
  };
};

// ========================================
// Main React Query Hook
// ========================================

export const useMe = (explicitWorkspaceId?: string) => {
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const params = useParams();

  // Determine which workspace to load
  const workspaceId = explicitWorkspaceId || (params?.workspaceId as string);

  const query = useQuery({
    queryKey: workspaceKeys.me(workspaceId),
    queryFn: async () => {
      const response = await getMeRequest(workspaceId);
      return response.data as UserData;
    },
    enabled: !!firebaseUser && !authLoading, // Only fetch when authenticated
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

  // Save workspace ID to localStorage when data loads
  useEffect(() => {
    if (query.data?.workspace?._id) {
      saveLastWorkspaceId(query.data.workspace._id);
    }
  }, [query.data?.workspace?._id]);

  return query;
};

// Hook for loading user data with fallback to last workspace
export const useMeWithFallback = () => {
  const params = useParams();

  // Determine which workspace to load
  const urlWorkspaceId = params?.workspaceId as string;
  const fallbackWorkspaceId = !urlWorkspaceId
    ? getLastWorkspaceId()
    : undefined;
  const workspaceId = urlWorkspaceId || fallbackWorkspaceId || undefined;

  return useMe(workspaceId);
};

// ========================================
// Convenience Hooks
// ========================================

export const useCurrentUser = (workspaceId?: string) => {
  const { data } = useMe(workspaceId);
  return data?.user;
};

export const useWorkspaces = (workspaceId?: string) => {
  const { data } = useMe(workspaceId);
  return data?.workspaces || [];
};

export const useCurrentWorkspace = (workspaceId?: string) => {
  const { data } = useMe(workspaceId);
  return data?.workspace;
};

// ========================================
// Resource Data Hooks
// ========================================

export const useInitialResourceData = (workspaceId?: string) => {
  const { data } = useMe(workspaceId);
  return {
    reports: data?.reports || [],
    sources: data?.sources || [],
    chats: data?.chats || [],
  };
};

// ========================================
// Workspace Management Hook
// ========================================

export const useWorkspaceManagement = () => {
  const navigation = useWorkspaceNavigation();

  return {
    // Navigation
    ...navigation,

    // LocalStorage utilities
    getLastWorkspaceId,
    saveLastWorkspaceId,
    clearWorkspacePreferences,

    // Query utilities
    workspaceKeys,
  };
};
