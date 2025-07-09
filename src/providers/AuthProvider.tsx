"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { User } from "@/lib/firebase";
import { useAuth as useFirebaseAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  isAuthenticated: boolean;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ success: false }),
  signUp: async () => ({ success: false }),
  signOut: async () => ({ success: false }),
  signInWithGoogle: async () => ({ success: false }),
  isAuthenticated: false,
  clearAuth: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useFirebaseAuth();
  const router = useRouter();

  const isAuthenticated = Boolean(auth.user && !auth.loading);

  const clearAuth = useCallback(() => {
    auth.signOut();
  }, [auth]);

  const signOut = useCallback(async () => {
    const result = await auth.signOut();
    if (result.success) {
      router.push("/welcome");
    }
    return result;
  }, [auth, router]);

  useEffect(() => {
    if (!auth.loading) {
      const currentPath = window.location.pathname;

      if (
        isAuthenticated &&
        ["/welcome", "/login", "/signup"].includes(currentPath)
      ) {
        router.push("/");
      }

      if (
        !isAuthenticated &&
        !["/welcome", "/login", "/signup"].includes(currentPath)
      ) {
        router.push("/welcome");
      }
    }
  }, [auth.loading, isAuthenticated, router]);

  const value: AuthContextType = {
    user: auth.user,
    loading: auth.loading,

    signIn: auth.signIn,
    signUp: auth.signUp,
    signOut,
    signInWithGoogle: auth.signInWithGoogle,

    isAuthenticated,
    clearAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
