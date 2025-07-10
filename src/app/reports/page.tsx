"use client";

import { useReports } from "@/features/reports/useReports";
import { useWorkspaces } from "@/features/workspaces/useWorkspaces";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

export default function ReportsPage() {
  const { user, loading: authLoading } = useAuth();
  const {
    user: userData,
    currentWorkspace,
    isLoading: userLoading,
    error: userError,
  } = useWorkspaces();
  const workspaceId = currentWorkspace?._id || "";

  const {
    data: reportsData,
    isLoading: reportsLoading,
    error: reportsError,
  } = useReports(workspaceId);

  // Show loading state
  if (authLoading || userLoading || reportsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold mb-4 text-center">
            <div className="mb-4">Loading reports...</div>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (userError || reportsError) {
    const error = userError || reportsError;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold mb-4 text-center text-red-600">
            Error loading reports
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
            Please log in to access reports
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
            Please select a workspace to view reports
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

  // Main reports view
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Reports</h1>
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

        {/* Reports List */}
        {reportsData && reportsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportsData.map((report) => (
              <Link
                key={report._id}
                href={`/reports/${report._id}`}
                className="block"
              >
                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 truncate">
                      {report.name}
                    </h3>
                    {report.is_public && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Public
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Theme:</span>
                      <span className="ml-2">{report.theme}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Sources:</span>
                      <span className="ml-2">{report.sources.length}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Scheduling:</span>
                      <span className="ml-2">
                        {report.scheduling?.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">History:</span>
                      <span className="ml-2">
                        {report.history?.length || 0} entries
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {report.prompt}
                    </p>
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
                  d="M9 17v-2a4 4 0 00-4-4H2m8 0V9a4 4 0 00-4-4H2m8 0h9l-3-3m0 6l3-3"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No reports found
            </h3>
            <p className="text-gray-600">
              No reports have been created in this workspace yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
