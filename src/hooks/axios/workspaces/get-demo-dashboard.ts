import { type Dashboard } from "../../../models/dashboard";
import { createAxiosRequest } from "../common/create-axios-request";

const getDemoDashboardRequest = createAxiosRequest<Dashboard>({
  endpoint: "actions/workspaces/get-demo-dashboard",
});

export { getDemoDashboardRequest };
