import axios, { AxiosRequestConfig, isAxiosError } from "axios";
import { auth } from "./firebase";

// Our standard client with BFF baseURL
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DATA_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Extended config interface to include Ghent-specific properties
interface ExtendedRequestConfig extends AxiosRequestConfig {
  _isGhentRequest?: boolean;
  _workspaceId?: string;
}

const initializeAxiosClient = () => {
  // This sets up the interceptor to always try to fetch the token right before a request.
  axiosClient.interceptors.request.use(
    async (config) => {
      try {
        // First try to get token from current Firebase user
        const user = auth.currentUser;
        let token = null;

        if (user) {
          // If user is authenticated in this session, get fresh token
          token = await user.getIdToken();
        } else {
          // Fallback to localStorage if no current user (e.g. page refresh)
          token =
            typeof window !== "undefined"
              ? localStorage.getItem("authToken")
              : null;
        }

        // Set the Authorization header if we have a token
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        } else {
          config.headers["Authorization"] = "";
        }

        // Handle Ghent requests - change baseURL if needed
        const extendedConfig = config as ExtendedRequestConfig;
        if (extendedConfig._isGhentRequest === true) {
          config.baseURL = process.env.NEXT_PUBLIC_GHENT_BASE_URL || "";
        }

        // Add workspace ID header - only if explicitly provided in config
        if (extendedConfig._workspaceId) {
          config.headers["x-workspace-id"] = extendedConfig._workspaceId;
        }
      } catch (error) {
        console.error("Error getting token or workspace ID:", error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor to handle common errors
  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error("Unauthorized request. Please log in again.");
        // You could add redirection here if needed
      }
      return Promise.reject(error);
    }
  );

  // Also initialize global axios instance
  setupGlobalAxios();
};

// Configure the global axios instance as well
const setupGlobalAxios = () => {
  // Set base URL for API requests to BFF by default
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_DATA_API_BASE_URL || "";

  // Configure global axios instance similarly
  axios.interceptors.request.use(
    async (config) => {
      try {
        // First try to get token from current Firebase user
        const user = auth.currentUser;
        let token = null;

        if (user) {
          // If user is authenticated in this session, get fresh token
          token = await user.getIdToken();
        } else {
          // Fallback to localStorage if no current user (e.g. page refresh)
          token =
            typeof window !== "undefined"
              ? localStorage.getItem("authToken")
              : null;
        }

        // Set the Authorization header if we have a token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Workspace ID should be explicitly provided in request config
        // Global axios doesn't have access to workspace context
        // Individual API calls should use the configured axiosClient with workspace ID
      } catch (error) {
        console.error("Error setting up global axios:", error);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Global error handling
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error("Unauthorized request. Please log in again.");
      }
      return Promise.reject(error);
    }
  );
};

// Helper function to create a Ghent request config
export const createGhentRequest = (
  workspaceId?: string
): ExtendedRequestConfig => {
  return {
    _isGhentRequest: true,
    _workspaceId: workspaceId,
  };
};

export { axiosClient, initializeAxiosClient, isAxiosError };
