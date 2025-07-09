import { type Dashboard } from "../../../models/dashboard";
import { createAxiosRequest } from "../common/create-axios-request";

const getWorkspaceDashboardsRequest = createAxiosRequest<Dashboard[]>({
  endpoint: "actions/workspaces/get-dashboards",
});

export { getWorkspaceDashboardsRequest };
