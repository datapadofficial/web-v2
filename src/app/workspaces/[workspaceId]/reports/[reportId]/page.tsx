"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useWorkspaces } from "@/features/workspaces/useWorkspaces";
import { useReports } from "@/features/reports/useReports";

export default function ReportDetailPage() {
  const { reportId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const {
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

  // Find the specific report
  const report = reportsData?.find((r) => r._id === reportId);

  // Show loading state
  if (authLoading || userLoading || reportsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold mb-4 text-center">
            <div className="mb-4">Loading report...</div>
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
            Error loading report
          </div>
          <div className="text-gray-600 text-center">
            {error?.message || "An error occurred"}
          </div>
          <div className="mt-4 text-center">
            <Link href="/reports" className="text-blue-500 hover:text-blue-700">
              ← Back to Reports
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
            Please log in to access report details
          </div>
          <div className="mt-4 text-center">
            <Link href="/reports" className="text-blue-500 hover:text-blue-700">
              ← Back to Reports
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
            Please select a workspace to view report details
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

  // Show report not found
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold text-center mb-4">
            Report not found
          </div>
          <div className="text-gray-600 text-center mb-4">
            The report you&apos;re looking for doesn&apos;t exist or you
            don&apos;t have access to it.
          </div>
          <div className="text-center">
            <Link href="/reports" className="text-blue-500 hover:text-blue-700">
              ← Back to Reports
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
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-bold">{report.name}</h1>
                {report.is_public && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Public
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">ID: {report._id}</p>
              <p className="text-sm text-gray-500">Theme: {report.theme}</p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/reports"
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                ← Back to Reports
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
                <p className="text-sm text-gray-900">{report.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Theme
                </label>
                <p className="text-sm text-gray-900">{report.theme}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Public
                </label>
                <p className="text-sm text-gray-900">
                  {report.is_public ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sources
                </label>
                <p className="text-sm text-gray-900">
                  {report.sources.length} source(s)
                </p>
              </div>
            </div>
          </div>

          {/* Prompt */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Prompt</h2>
            <div className="bg-gray-50 rounded-md p-4">
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {report.prompt}
              </p>
            </div>
          </div>

          {/* Sources */}
          {report.sources.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Sources ({report.sources.length})
              </h2>
              <div className="space-y-2">
                {report.sources.map((sourceId, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm font-medium">{sourceId}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scheduling */}
          {report.scheduling && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Scheduling</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enabled
                  </label>
                  <p className="text-sm text-gray-900">
                    {report.scheduling.enabled ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frequency
                  </label>
                  <p className="text-sm text-gray-900">
                    {report.scheduling.frequency}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cron Expression
                  </label>
                  <p className="text-sm text-gray-900 font-mono">
                    {report.scheduling.cron_expression}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* History */}
          {report.history && report.history.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                History ({report.history.length})
              </h2>
              <div className="space-y-4">
                {report.history.map((entry, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-md"
                  >
                    <div className="mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Entry {index + 1}
                      </span>
                    </div>
                    {entry.prompt && (
                      <div className="mb-2">
                        <p className="text-xs text-gray-600">Prompt:</p>
                        <p className="text-sm text-gray-800">{entry.prompt}</p>
                      </div>
                    )}
                    {entry.analysis && (
                      <div className="mb-2">
                        <p className="text-xs text-gray-600">Analysis:</p>
                        <p className="text-sm text-gray-800">
                          {entry.analysis}
                        </p>
                      </div>
                    )}
                    {entry.sys?.createdAt && (
                      <div className="text-xs text-gray-500">
                        Created:{" "}
                        {new Date(entry.sys.createdAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Raw Data */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Raw Data</h2>
            <div className="bg-gray-100 rounded-md p-4 overflow-auto">
              <pre className="text-sm">{JSON.stringify(report, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
