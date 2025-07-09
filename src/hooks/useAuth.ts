"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  googleProvider,
  signInWithPopup,
  onIdTokenChanged,
  TOKEN_REFRESH_INTERVAL,
  User,
} from "@/lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to handle token refresh
  const refreshToken = async (user: User) => {
    try {
      const token = await user.getIdToken(true);
      await persistToken(token);
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  // Function to persist token in both cookie and localStorage
  const persistToken = async (token: string) => {
    // Store in localStorage for client-side access
    localStorage.setItem("authToken", token);

    // Store in cookie for server-side/middleware access
    // Use HttpOnly false so middleware can read it
    setCookie("authToken", token, {
      maxAge: 60 * 60 * 24 * 5, // 5 days
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  };

  // Function to clear tokens on logout
  const clearTokens = () => {
    localStorage.removeItem("authToken");
    deleteCookie("authToken");
  };

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setLoading(true);

      if (user) {
        // User is signed in
        setUser(user);

        // Get the token and persist it
        const token = await user.getIdToken();
        await persistToken(token);

        // Set up token refresh
        const refreshInterval = setInterval(() => {
          if (auth.currentUser) {
            refreshToken(auth.currentUser);
          }
        }, TOKEN_REFRESH_INTERVAL);

        // Clear interval on cleanup
        return () => clearInterval(refreshInterval);
      } else {
        // User is signed out
        setUser(null);
        clearTokens();
      }

      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [refreshToken]);

  // Sign in with email/password
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/workspaces");
      return { success: true };
    } catch (error: unknown) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to sign in",
      };
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email/password
  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/workspaces");
      return { success: true };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create account",
      };
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      router.push("/workspaces");
      return { success: true };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to sign in with Google",
      };
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      clearTokens();
      router.push("/welcome");
      return { success: true };
    } catch (error: unknown) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to sign out",
      };
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };
}
