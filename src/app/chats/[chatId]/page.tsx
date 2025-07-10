"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useWorkspaces } from "@/features/workspaces/useWorkspaces";
import { useChats } from "@/features/chats/useChats";

export default function ChatDetailPage() {
  const { chatId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const {
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

  // Find the specific chat
  const chat = chatsData?.find((c) => c._id === chatId);

  // Show loading state
  if (authLoading || userLoading || chatsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold mb-4 text-center">
            <div className="mb-4">Loading chat...</div>
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
            Error loading chat
          </div>
          <div className="text-gray-600 text-center">
            {error?.message || "An error occurred"}
          </div>
          <div className="mt-4 text-center">
            <Link href="/chats" className="text-blue-500 hover:text-blue-700">
              ← Back to Chats
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
            Please log in to access chat details
          </div>
          <div className="mt-4 text-center">
            <Link href="/chats" className="text-blue-500 hover:text-blue-700">
              ← Back to Chats
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
            Please select a workspace to view chat details
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

  // Show chat not found
  if (!chat) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold text-center mb-4">
            Chat not found
          </div>
          <div className="text-gray-600 text-center mb-4">
            The chat you&apos;re looking for doesn&apos;t exist or you
            don&apos;t have access to it.
          </div>
          <div className="text-center">
            <Link href="/chats" className="text-blue-500 hover:text-blue-700">
              ← Back to Chats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                {chat.name || "Untitled Chat"}
              </h1>
              <p className="text-sm text-gray-500">ID: {chat._id}</p>
              <p className="text-sm text-gray-500">
                Created: {new Date(chat.sys.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/chats"
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                ← Back to Chats
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <p className="text-sm text-gray-900">
                  {chat.name || "Untitled Chat"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Messages
                </label>
                <p className="text-sm text-gray-900">
                  {chat.messages.length} message(s)
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Created
                </label>
                <p className="text-sm text-gray-900">
                  {new Date(chat.sys.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Updated
                </label>
                <p className="text-sm text-gray-900">
                  {new Date(chat.sys.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          {chat.messages.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Messages ({chat.messages.length})
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {chat.messages.map((message, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-md"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Message {index + 1}
                      </span>
                      <span className="text-xs text-gray-500">
                        {message.role || "unknown"}
                      </span>
                    </div>
                    <div className="text-sm text-gray-800">
                      {typeof message.content === "string" ? (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      ) : (
                        <pre className="text-xs overflow-auto">
                          {JSON.stringify(message.content, null, 2)}
                        </pre>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Canvas */}
          {chat.canvas && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Canvas</h2>
              <div className="bg-gray-50 rounded-md p-4">
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(chat.canvas, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Accumulated Data */}
          {chat.accumulated_data && chat.accumulated_data.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Accumulated Data ({chat.accumulated_data.length})
              </h2>
              <div className="bg-gray-50 rounded-md p-4">
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(chat.accumulated_data, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Raw Data */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Raw Data</h2>
            <div className="bg-gray-100 rounded-md p-4 overflow-auto">
              <pre className="text-sm">{JSON.stringify(chat, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
