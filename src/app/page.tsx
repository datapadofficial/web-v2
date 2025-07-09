"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useMeWithFallback } from "@/features/workspaces/useWorkspaces";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const {
    data: meData,
    isLoading: meLoading,
    error: meError,
  } = useMeWithFallback();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth to be determined
    if (authLoading) return;

    // If user is not authenticated, middleware will handle redirect to /welcome
    if (!user) return;

    // If user is authenticated but me data is still loading, wait
    if (meLoading) return;

    // If there's an error loading user data, redirect to welcome
    if (meError) {
      router.push("/welcome");
      return;
    }

    // If user has workspaces, redirect to the workspace list
    if (meData?.workspaces && meData.workspaces.length > 0) {
      router.push("/workspaces");
    } else {
      // If user has no workspaces, redirect to welcome for onboarding
      router.push("/welcome");
    }
  }, [user, authLoading, meData, meLoading, meError, router]);

  // Show loading state
  if (authLoading || (user && meLoading)) {
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
