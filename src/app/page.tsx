"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useWorkspaces } from "@/features/workspaces/useWorkspaces";
import Link from "next/link";

export default function Home() {
  const { user, loading: authLoading, signOut } = useAuth();
  const {
    user: userData,
    currentWorkspace,
    isLoading: userLoading,
    error: userError,
  } = useWorkspaces();

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
  };

  // Show loading state
  if (authLoading || userLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold mb-4 text-center">
            <div className="mb-4">Loading...</div>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (userError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold mb-4 text-center text-red-600">
            Error loading user data
          </div>
          <div className="text-gray-600 text-center">
            {userError?.message || "An error occurred"}
          </div>
          <div className="mt-4 text-center">
            <Link href="/welcome" className="text-blue-500 hover:text-blue-700">
              Go to Welcome
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If user is not authenticated, show login prompt
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold mb-4 text-center">
            Please log in to access resources
          </div>
          <div className="mt-4 text-center">
            <Link href="/welcome" className="text-blue-500 hover:text-blue-700">
              Go to Welcome
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main resources view
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Resources</h1>
            <p className="text-sm text-gray-500">
              Welcome back, {userData?.display_name || userData?.email}
            </p>
            {currentWorkspace && (
              <p className="text-sm text-gray-500">
                Current workspace: {currentWorkspace.name}
              </p>
            )}
            <p className="text-sm text-gray-500">
              Testing interface for Sources, Chats, and Reports
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/workspaces"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Go to Workspaces
            </Link>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Show workspace selection prompt if no workspace */}
        {!currentWorkspace && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-yellow-800">
              No workspace selected
            </h3>
            <p className="text-yellow-700 mb-4">
              Please select a workspace to test your resources. The resource
              pages will show data from the currently selected workspace.
            </p>
            <Link
              href="/workspaces"
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
            >
              Select Workspace →
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sources Card */}
          <Link href="/sources" className="block">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">Sources</h2>
              <p className="text-gray-600 mb-4">
                View and test all sources data
              </p>
              <div className="text-blue-500 hover:text-blue-700 font-medium">
                Open Sources →
              </div>
            </div>
          </Link>

          {/* Chats Card */}
          <Link href="/chats" className="block">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">Chats</h2>
              <p className="text-gray-600 mb-4">View and test all chats data</p>
              <div className="text-blue-500 hover:text-blue-700 font-medium">
                Open Chats →
              </div>
            </div>
          </Link>

          {/* Reports Card */}
          <Link href="/reports" className="block">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">Reports</h2>
              <p className="text-gray-600 mb-4">
                View and test all reports data
              </p>
              <div className="text-blue-500 hover:text-blue-700 font-medium">
                Open Reports →
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Testing Instructions</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Click on any resource card to view its data</li>
            <li>• Each resource page will show the raw JSON data</li>
            <li>• Use this to test API connections and data structure</li>
            <li>
              • Return to this page using the &quot;Back to Home&quot; button
            </li>
            {currentWorkspace && (
              <li>
                • Currently testing with workspace:{" "}
                <strong>{currentWorkspace.name}</strong>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
