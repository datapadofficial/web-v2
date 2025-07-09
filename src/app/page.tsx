"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useWorkspace } from "@/providers/WorkspaceProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const { workspaces, isLoading: workspaceLoading } = useWorkspace();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth to be determined
    if (authLoading) return;

    // If user is not authenticated, middleware will handle redirect to /welcome
    if (!user) return;

    // If user is authenticated but workspaces are still loading, wait
    if (workspaceLoading) return;

    // If user has workspaces, redirect to the workspace list
    if (workspaces.length > 0) {
      router.push("/workspaces");
    } else {
      // If user has no workspaces, redirect to welcome for onboarding
      router.push("/welcome");
    }
  }, [user, authLoading, workspaces, workspaceLoading, router]);

  // Show loading state
  if (authLoading || (user && workspaceLoading)) {
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

  // If user is not authenticated, show a brief message before middleware redirect
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="text-2xl font-bold mb-4 text-center">
            Redirecting to welcome...
          </div>
        </div>
      </div>
    );
  }

  // Default fallback (should rarely be seen)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="p-8 rounded-lg bg-white shadow-md">
        <div className="text-2xl font-bold mb-4 text-center">
          Redirecting...
        </div>
      </div>
    </div>
  );
}
