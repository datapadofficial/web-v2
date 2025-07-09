import { initializeAxiosClient } from "./axios-client";

/**
 * Initialize axios configuration for the application
 * We're using the common implementation for backward compatibility
 */
export function initializeAxiosConfigurations() {
  // Initialize the axiosClient instance
  initializeAxiosClient();

  console.log("Axios configuration initialized successfully");
}

export default initializeAxiosConfigurations;
