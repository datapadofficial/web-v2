import { type Dashboard } from "../../../models/dashboard";
import { createAxiosRequest } from "../common/create-axios-request";

const createDashboardRequest = createAxiosRequest<Dashboard>({
  endpoint: "actions/dashboards/create-dashboard",
});

export { createDashboardRequest };
