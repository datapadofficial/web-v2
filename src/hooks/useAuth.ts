"use client";

import { useEffect, useState } from "react";
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

  // Function to persist token in both cookie and localStorage
  const persistToken = async (token: string) => {
    localStorage.setItem("authToken", token);
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
    localStorage.removeItem("workspaceId");
    deleteCookie("authToken");
  };

  // Setup auth state listener
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setLoading(true);
      try {
        if (user) {
          const token = await user.getIdToken();
          await persistToken(token);
          setUser(user);

          // Setup token refresh
          const interval = setInterval(async () => {
            if (auth.currentUser) {
              const refreshedToken = await auth.currentUser.getIdToken(true);
              await persistToken(refreshedToken);
            }
          }, TOKEN_REFRESH_INTERVAL);

          return () => clearInterval(interval);
        } else {
          setUser(null);
          clearTokens();
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle authentication process
  const handleAuthProcess = async (
    authFn: () => Promise<User>,
    successMessage?: string
  ) => {
    try {
      setLoading(true);

      // Execute the authentication function
      const authUser = await authFn();

      // Get and persist the token
      const token = await authUser.getIdToken();
      await persistToken(token);

      // Update user state
      setUser(authUser);

      return { success: true, message: successMessage };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Authentication failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email/password
  const signIn = async (email: string, password: string) => {
    return handleAuthProcess(async () => {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    }, "Successfully signed in");
  };

  // Sign up with email/password
  const signUp = async (email: string, password: string) => {
    return handleAuthProcess(async () => {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result.user;
    }, "Account created successfully");
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    return handleAuthProcess(async () => {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    }, "Successfully signed in with Google");
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      clearTokens();
      setUser(null);
      return { success: true };
    } catch (error) {
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
