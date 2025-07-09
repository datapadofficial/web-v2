import axios from "axios";

/**
 * Get the current user and their workspaces
 */
export const getMeRequest = async () => {
  return axios.post("/actions/me/get-me");
};

/**
 * Get a specific workspace by ID
 */
export const getWorkspaceRequest = async (params: { workspace_id: string }) => {
  return axios.post(`/actions/workspaces/get-workspace`, {
    workspace_id: params.workspace_id,
  });
};

/**
 * Create a new workspace
 */
export const createWorkspaceRequest = async (data: {
  name: string;
  timezone: string;
}) => {
  return axios.post("/actions/workspaces/create", data);
};

/**
 * Get dashboards for a workspace
 */
export const getWorkspaceDashboardsRequest = async (params: {
  workspace_id: string;
}) => {
  return axios.post(`/actions/workspaces/get-dashboards`, {
    workspace_id: params.workspace_id,
  });
};

/**
 * Get the demo dashboard for a workspace
 */
export const getDemoDashboardRequest = async (params: {
  workspace_id: string;
}) => {
  return axios.post(`/actions/workspaces/get-demo-dashboard`, {
    workspace_id: params.workspace_id,
  });
};
