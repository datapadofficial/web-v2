"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useWorkspace } from "@/providers/WorkspaceProvider";

export default function Home() {
  const { loading: authLoading } = useAuth();
  const { isLoading: workspaceLoading } = useWorkspace();

  // The actual redirection is handled by the WorkspaceProvider
  // This page serves as a loading screen while auth state is determined

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-2xl font-bold mb-4">
        {authLoading || workspaceLoading ? "Loading..." : "Redirecting..."}
      </div>
    </div>
  );
}
