"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { getMeRequest, type UserData } from "@/hooks/axios/ghent/me/get-me";

export interface Workspace {
  _id: string;
  name: string;
  admins: string[];
  members: string[];
  features?: {
    ai?: boolean;
  };
}

interface WorkspaceContextType {
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  sources: any[];
  chats: any[];
  reports: any[];
  isLoading: boolean;
  error: string | null;
  switchWorkspace: (workspaceId: string) => Promise<void>;
  refreshWorkspaces: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType>({
  currentWorkspace: null,
  workspaces: [],
  sources: [],
  chats: [],
  reports: [],
  isLoading: false,
  error: null,
  switchWorkspace: async () => {},
  refreshWorkspaces: async () => {},
});

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null
  );
  const [sources, setSources] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Extract workspaceId from URL if in /workspaces/[workspaceId] format
  const getWorkspaceIdFromUrl = () => {
    if (!pathname) return null;

    const match = pathname.match(/\/workspaces\/([^\/]+)/);
    return match ? match[1] : null;
  };

  // Get the last used workspace ID from localStorage
  const getLastWorkspaceId = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("workspaceId");
  };

  // Fetch user data and workspaces using Ghent API
  const fetchUserData = async (workspaceId?: string) => {
    if (!user) return null;

    try {
      setIsLoading(true);
      setError(null);

      const response = await getMeRequest(workspaceId);
      const userData = response.data;

      // Update state with the fetched data
      setWorkspaces(userData.workspaces || []);
      setSources(userData.sources || []);
      setChats(userData.chats || []);
      setReports(userData.reports || []);

      if (userData.workspace) {
        setCurrentWorkspace(userData.workspace);
        localStorage.setItem("workspaceId", userData.workspace._id);
      }

      return userData;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle workspace switching
  const switchWorkspace = async (workspaceId: string) => {
    if (!workspaceId) return;

    try {
      setIsLoading(true);
      setError(null);

      // Store in localStorage for persistence
      localStorage.setItem("workspaceId", workspaceId);

      // Fetch updated data for the new workspace
      await fetchUserData(workspaceId);

      // Navigate to the workspace
      router.push(`/workspaces/${workspaceId}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to switch workspace"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh workspace data
  const refreshWorkspaces = async () => {
    const currentId = currentWorkspace?._id || getLastWorkspaceId();
    await fetchUserData(currentId || undefined);
  };

  // Handle auth status and routing - centralized pattern
  useEffect(() => {
    // Wait until auth state is determined
    if (authLoading) return;

    // User is not authenticated
    if (!user) {
      // Only redirect to welcome if not already there
      if (!pathname?.includes("/welcome")) {
        router.push("/welcome");
      }
      setIsLoading(false);
      return;
    }

    // User is authenticated
    const initializeWorkspace = async () => {
      // First check if we have a workspace ID in the URL
      const urlWorkspaceId = getWorkspaceIdFromUrl();

      // Then check localStorage for last used workspace
      const localStorageWorkspaceId = getLastWorkspaceId();

      // Determine which workspace to use (URL > localStorage)
      const workspaceToUse = urlWorkspaceId || localStorageWorkspaceId;

      // Fetch data with the workspace ID if available
      const userData = await fetchUserData(workspaceToUse || undefined);

      // If we don't have a workspace but have workspaces, use the first one
      if (!currentWorkspace && workspaces.length > 0) {
        const firstWorkspaceId = workspaces[0]._id;

        // If we're not on the workspace page already, redirect to it
        if (!urlWorkspaceId && !pathname?.includes("/welcome")) {
          router.push(`/workspaces/${firstWorkspaceId}`);
        }
      } else if (!workspaces.length && !pathname?.includes("/welcome")) {
        // No workspaces available, go to welcome/onboarding
        router.push("/welcome");
      }
    };

    initializeWorkspace();
  }, [user, authLoading, pathname]);

  // Update current workspace when URL changes
  useEffect(() => {
    if (authLoading || !user) return;

    const urlWorkspaceId = getWorkspaceIdFromUrl();
    if (
      urlWorkspaceId &&
      (!currentWorkspace || urlWorkspaceId !== currentWorkspace._id)
    ) {
      // URL has a different workspace ID than what we currently have loaded
      switchWorkspace(urlWorkspaceId);
    }
  }, [pathname, user, authLoading]);

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        workspaces,
        sources,
        chats,
        reports,
        isLoading,
        error,
        switchWorkspace,
        refreshWorkspaces,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export const useWorkspace = () => useContext(WorkspaceContext);
