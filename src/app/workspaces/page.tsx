"use client";

import { useAuth } from "@/providers/AuthProvider";
import {
  useMeWithFallback,
  useWorkspaces,
  useWorkspaceNavigation,
} from "@/features/workspaces/useWorkspaces";
import { Workspace } from "@/types/workspace";

export default function WorkspacesPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const {
    data: meData,
    isLoading: meLoading,
    error: meError,
  } = useMeWithFallback();

  const workspaces = useWorkspaces();
  const { switchWorkspace } = useWorkspaceNavigation();

  // Handle workspace selection
  const handleWorkspaceSelect = (workspace: Workspace) => {
    switchWorkspace(workspace._id);
  };

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
    // Navigation will be handled by the auth state change
  };

  // Show loading state
  if (authLoading || meLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold mb-4 text-center">
            <div className="mb-4">Loading your workspaces</div>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (meError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold mb-4 text-center text-red-600">
            Error loading workspaces
          </div>
          <div className="text-gray-600 text-center">{meError.message}</div>
        </div>
      </div>
    );
  }

  // Show login prompt (middleware should handle this, but just in case)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold text-center">
            Please log in to access your workspaces
          </div>
        </div>
      </div>
    );
  }

  // Show no workspaces state
  if (!workspaces.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold text-center mb-4">
            No workspaces found
          </div>
          <div className="text-gray-600 text-center">
            Create your first workspace to get started.
          </div>
        </div>
      </div>
    );
  }

  // Main workspaces view
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Workspaces</h1>
            <p className="text-sm text-gray-500">
              Welcome back, {meData?.user?.display_name || meData?.user?.email}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((workspace: Workspace) => (
            <div
              key={workspace._id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleWorkspaceSelect(workspace)}
            >
              <h2 className="text-xl font-semibold mb-2">{workspace.name}</h2>
              <p className="text-gray-600 mb-4">
                {workspace.admins?.length || 0} admin
                {(workspace.admins?.length || 0) !== 1 ? "s" : ""}
              </p>
              <div className="text-blue-500 hover:text-blue-700 font-medium">
                Open Workspace →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
