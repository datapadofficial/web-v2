"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { getMeRequest, UserData } from "@/hooks/axios/ghent/me/get-me";
import { Workspace } from "@/models/workspace";
import { Source } from "@/models/source";
import { Chat } from "@/models/chat";
import { Report } from "@/models/report";

interface WorkspaceContextType {
  // Core workspace data
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  sources: Source[];
  chats: Chat[];
  reports: Report[];

  // Loading and error states
  isLoading: boolean;
  error: string | null;

  // Actions
  refreshWorkspaceData: () => Promise<void>;
  switchWorkspace: (workspaceId: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType>({
  currentWorkspace: null,
  workspaces: [],
  sources: [],
  chats: [],
  reports: [],
  isLoading: false,
  error: null,
  refreshWorkspaceData: async () => {},
  switchWorkspace: () => {},
});

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null
  );
  const [sources, setSources] = useState<Source[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Cache to prevent duplicate API calls
  const loadingWorkspaceRef = useRef<string | null>(null);
  // Use ref to access current workspace without causing re-renders
  const currentWorkspaceRef = useRef<Workspace | null>(null);

  // Update ref whenever currentWorkspace changes
  useEffect(() => {
    currentWorkspaceRef.current = currentWorkspace;
  }, [currentWorkspace]);

  // Extract workspaceId from current URL
  const getWorkspaceIdFromUrl = useCallback(() => {
    if (!pathname) return null;
    const match = pathname.match(/\/workspaces\/([^\/]+)/);
    return match ? match[1] : null;
  }, [pathname]);

  // Persist workspace ID to localStorage
  const persistWorkspaceId = useCallback((workspaceId: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("workspaceId", workspaceId);
    }
  }, []);

  // Get last workspace ID from localStorage
  const getLastWorkspaceId = useCallback(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("workspaceId");
  }, []);

  // Load workspace data from API
  const loadWorkspaceData = useCallback(
    async (workspaceId?: string) => {
      if (!user || authLoading) return;

      // Prevent duplicate API calls
      if (loadingWorkspaceRef.current === workspaceId) return;

      // If we already have the correct workspace loaded, don't make another API call
      if (
        workspaceId &&
        currentWorkspaceRef.current &&
        currentWorkspaceRef.current._id === workspaceId
      ) {
        console.log(
          "Skipping API call - workspace already loaded:",
          workspaceId
        );
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        loadingWorkspaceRef.current = workspaceId || null;

        console.log("Making get-me API call for workspace:", workspaceId);
        const response = await getMeRequest(workspaceId);
        const data: UserData = response.data;

        // Update all workspace-related state
        setWorkspaces(data.workspaces || []);
        setSources(data.sources || []);
        setChats(data.chats || []);
        setReports(data.reports || []);

        // Set current workspace and persist ID
        if (data.workspace) {
          setCurrentWorkspace(data.workspace);
          persistWorkspaceId(data.workspace._id);
        } else if (workspaceId) {
          // If we requested a specific workspace but didn't get it, check if it exists in the list
          const foundWorkspace = data.workspaces.find(
            (w) => w._id === workspaceId
          );
          if (foundWorkspace) {
            setCurrentWorkspace(foundWorkspace);
            persistWorkspaceId(foundWorkspace._id);
          } else {
            // Workspace doesn't exist, redirect to workspace list
            router.push("/workspaces");
          }
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load workspace data";
        setError(errorMessage);
        console.error("Error loading workspace data:", err);
      } finally {
        setIsLoading(false);
        loadingWorkspaceRef.current = null;
      }
    },
    [user, authLoading, persistWorkspaceId, router]
  );

  // Refresh current workspace data
  const refreshWorkspaceData = useCallback(async () => {
    const urlWorkspaceId = getWorkspaceIdFromUrl();
    const targetWorkspaceId = urlWorkspaceId || getLastWorkspaceId();
    await loadWorkspaceData(targetWorkspaceId || undefined);
  }, [getWorkspaceIdFromUrl, getLastWorkspaceId, loadWorkspaceData]);

  // Switch workspace programmatically
  const switchWorkspace = useCallback(
    (workspaceId: string) => {
      router.push(`/workspaces/${workspaceId}`);
      // The URL change will trigger the useEffect below to load the workspace data
    },
    [router]
  );

  // 🎯 MAIN LOGIC: React to URL changes and user authentication
  useEffect(() => {
    if (authLoading) return;

    // User is not authenticated - clear workspace data
    if (!user) {
      setWorkspaces([]);
      setCurrentWorkspace(null);
      setSources([]);
      setChats([]);
      setReports([]);
      setError(null);
      return;
    }

    // User is authenticated - determine which workspace to load
    const urlWorkspaceId = getWorkspaceIdFromUrl();

    if (urlWorkspaceId) {
      // We're on a specific workspace page - load that workspace
      loadWorkspaceData(urlWorkspaceId);
    } else {
      // We're on a general page - load user's default workspace
      const lastWorkspaceId = getLastWorkspaceId();
      loadWorkspaceData(lastWorkspaceId || undefined);
    }
  }, [
    user,
    authLoading,
    pathname,
    getWorkspaceIdFromUrl,
    getLastWorkspaceId,
    loadWorkspaceData,
  ]);

  // Clear workspace data when user logs out
  useEffect(() => {
    if (!user && !authLoading) {
      setWorkspaces([]);
      setCurrentWorkspace(null);
      setSources([]);
      setChats([]);
      setReports([]);
      setError(null);
    }
  }, [user, authLoading]);

  const value: WorkspaceContextType = {
    currentWorkspace,
    workspaces,
    sources,
    chats,
    reports,
    isLoading,
    error,
    refreshWorkspaceData,
    switchWorkspace,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export const useWorkspace = () => useContext(WorkspaceContext);

// Re-export the Workspace interface for convenience
export type { Workspace };
