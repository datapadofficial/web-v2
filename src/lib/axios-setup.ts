"use client";

import { initializeAxiosClient } from "../hooks/axios/common/axios-client";

/**
 * Initialize axios configuration for the application
 * We're using the common implementation for backward compatibility
 */
export function initializeAxiosConfigurations() {
  // Initialize the axiosClient instance
  initializeAxiosClient();

  console.log("Axios configuration initialized successfully");
}

// Initialize automatically when imported in a client component
if (typeof window !== "undefined") {
  initializeAxiosConfigurations();
}

export default initializeAxiosConfigurations;
