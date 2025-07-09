"use client";

import { useParams, useRouter } from "next/navigation";
import { useWorkspace } from "@/providers/WorkspaceProvider";
import { useAuth } from "@/providers/AuthProvider";

export default function WorkspacePage() {
  const { workspaceId } = useParams();
  const { user, loading: authLoading, signOut } = useAuth();
  const {
    currentWorkspace,
    sources,
    chats,
    reports,
    isLoading: workspaceLoading,
    error,
  } = useWorkspace();
  const router = useRouter();

  // Handle navigation back to workspaces
  const handleBackToWorkspaces = () => {
    router.push("/workspaces");
  };

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
    router.push("/welcome");
  };

  // Show loading state
  if (authLoading || workspaceLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold mb-4 text-center">
            <div className="mb-4">Loading workspace...</div>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold mb-4 text-center text-red-600">
            Error loading workspace
          </div>
          <div className="text-gray-600 text-center mb-4">{error}</div>
          <button
            onClick={handleBackToWorkspaces}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Workspaces
          </button>
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
            Please log in to access your workspace
          </div>
        </div>
      </div>
    );
  }

  // Show workspace not found state
  if (!currentWorkspace) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold mb-4 text-center">
            Workspace not found
          </div>
          <div className="text-gray-600 text-center mb-4">
            The workspace you&apos;re looking for doesn&apos;t exist or you
            don&apos;t have access to it.
          </div>
          <button
            onClick={handleBackToWorkspaces}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Workspaces
          </button>
        </div>
      </div>
    );
  }

  // Main workspace view
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{currentWorkspace.name}</h1>
              <p className="text-gray-600">Workspace ID: {workspaceId}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleBackToWorkspaces}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Back to Workspaces
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Reports</h2>
            <p className="text-gray-600 mb-2">
              {reports.length} report{reports.length !== 1 ? "s" : ""}
            </p>
            <div className="text-sm text-gray-500">
              {reports.length > 0
                ? "Your reports will appear here."
                : "No reports yet."}
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Chats</h2>
            <p className="text-gray-600 mb-2">
              {chats.length} chat{chats.length !== 1 ? "s" : ""}
            </p>
            <div className="text-sm text-gray-500">
              {chats.length > 0
                ? "Your chats will appear here."
                : "No chats yet."}
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Sources</h2>
            <p className="text-gray-600 mb-2">
              {sources.length} source{sources.length !== 1 ? "s" : ""}
            </p>
            <div className="text-sm text-gray-500">
              {sources.length > 0
                ? "Your sources will appear here."
                : "No sources yet."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
