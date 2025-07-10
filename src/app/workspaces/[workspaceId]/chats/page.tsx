"use client";

import { useChats } from "@/features/chats/useChats";
import { useWorkspaces } from "@/features/workspaces/useWorkspaces";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

export default function ChatsPage() {
  const { user, loading: authLoading } = useAuth();
  const {
    user: userData,
    currentWorkspace,
    isLoading: userLoading,
    error: userError,
  } = useWorkspaces();

  const workspaceId = currentWorkspace?._id || "";

  const {
    data: chatsData,
    isLoading: chatsLoading,
    error: chatsError,
  } = useChats(workspaceId);

  // Show loading state
  if (authLoading || userLoading || chatsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold mb-4 text-center">
            <div className="mb-4">Loading chats...</div>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (userError || chatsError) {
    const error = userError || chatsError;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold mb-4 text-center text-red-600">
            Error loading chats
          </div>
          <div className="text-gray-600 text-center">
            {error?.message || "An error occurred"}
          </div>
          <div className="mt-4 text-center">
            <Link href="/" className="text-blue-500 hover:text-blue-700">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show login prompt
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold text-center">
            Please log in to access chats
          </div>
          <div className="mt-4 text-center">
            <Link href="/" className="text-blue-500 hover:text-blue-700">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show no workspace state
  if (!currentWorkspace) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold text-center mb-4">
            No workspace selected
          </div>
          <div className="text-gray-600 text-center mb-4">
            Please select a workspace to view chats
          </div>
          <div className="text-center">
            <Link
              href="/workspaces"
              className="text-blue-500 hover:text-blue-700"
            >
              Go to Workspaces →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main chats view
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Chats</h1>
            <p className="text-sm text-gray-500">
              Workspace: {currentWorkspace.name} ({workspaceId})
            </p>
            <p className="text-sm text-gray-500">
              User: {userData?.display_name || userData?.email}
            </p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Chats List */}
        {chatsData && chatsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chatsData.map((chat) => (
              <Link
                key={chat._id}
                href={`/chats/${chat._id}`}
                className="block"
              >
                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 truncate">
                      {chat.name || "Untitled Chat"}
                    </h3>
                    {chat.canvas && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Canvas
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Messages:</span>
                      <span className="ml-2">{chat.messages.length}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Created:</span>
                      <span className="ml-2">
                        {new Date(chat.sys.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Updated:</span>
                      <span className="ml-2">
                        {new Date(chat.sys.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    {chat.accumulated_data &&
                      chat.accumulated_data.length > 0 && (
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium">Data:</span>
                          <span className="ml-2">
                            {chat.accumulated_data.length} items
                          </span>
                        </div>
                      )}
                  </div>
                  <div className="mt-4">
                    {chat.messages.length > 0 && (
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {typeof chat.messages[0].content === "string"
                          ? chat.messages[0].content
                          : "Complex message content"}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 text-blue-500 hover:text-blue-700 font-medium">
                    View Details →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-500 mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No chats found
            </h3>
            <p className="text-gray-600">
              No chats have been created in this workspace yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
