"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useWorkspaces } from "@/features/workspaces/useWorkspaces";
import { useSources } from "@/features/sources/useSources";

export default function SourceDetailPage() {
  const { sourceId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const {
    currentWorkspace,
    isLoading: userLoading,
    error: userError,
  } = useWorkspaces();

  const workspaceId = currentWorkspace?._id || "";

  const {
    data: sourcesData,
    isLoading: sourcesLoading,
    error: sourcesError,
  } = useSources(workspaceId);

  // Find the specific source
  const source = sourcesData?.find(
    (s) => s._id === sourceId || s.id === sourceId
  );

  // Show loading state
  if (authLoading || userLoading || sourcesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold mb-4 text-center">
            <div className="mb-4">Loading source...</div>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (userError || sourcesError) {
    const error = userError || sourcesError;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold mb-4 text-center text-red-600">
            Error loading source
          </div>
          <div className="text-gray-600 text-center">
            {error?.message || "An error occurred"}
          </div>
          <div className="mt-4 text-center">
            <Link href="/sources" className="text-blue-500 hover:text-blue-700">
              ← Back to Sources
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
            Please log in to access source details
          </div>
          <div className="mt-4 text-center">
            <Link href="/sources" className="text-blue-500 hover:text-blue-700">
              ← Back to Sources
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
            Please select a workspace to view source details
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

  // Show source not found
  if (!source) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold text-center mb-4">
            Source not found
          </div>
          <div className="text-gray-600 text-center mb-4">
            The source you&apos;re looking for doesn&apos;t exist or you
            don&apos;t have access to it.
          </div>
          <div className="text-center">
            <Link href="/sources" className="text-blue-500 hover:text-blue-700">
              ← Back to Sources
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Status badge component
  const StatusBadge = ({ status }: { status?: string }) => {
    if (!status) return null;

    const statusColors = {
      active: "bg-green-100 text-green-800",
      generating: "bg-yellow-100 text-yellow-800",
      deleting: "bg-red-100 text-red-800",
      error: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusColors[status as keyof typeof statusColors] ||
          "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-bold">{source.name}</h1>
                <StatusBadge status={source.status} />
              </div>
              <p className="text-sm text-gray-500">
                Integration: {source.integration}
              </p>
              <p className="text-sm text-gray-500">
                ID: {source._id || source.id}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/sources"
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                ← Back to Sources
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
                <p className="text-sm text-gray-900">{source.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Integration
                </label>
                <p className="text-sm text-gray-900">{source.integration}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <StatusBadge status={source.status} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workspace ID
                </label>
                <p className="text-sm text-gray-900">
                  {source.workspace_id || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Columns */}
          {source.columns && source.columns.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Columns ({source.columns.length})
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {source.columns.map((column, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {column.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {column.type || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Views */}
          {source.views && source.views.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Views ({source.views.length})
              </h2>
              <div className="space-y-2">
                {source.views.map((view, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm font-medium">
                      {view.name || `View ${index + 1}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Raw Data */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Raw Data</h2>
            <div className="bg-gray-100 rounded-md p-4 overflow-auto">
              <pre className="text-sm">{JSON.stringify(source, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
