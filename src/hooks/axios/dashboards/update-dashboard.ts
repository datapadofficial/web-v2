import { type Dashboard } from "../../../models/dashboard";
import { createAxiosRequest } from "../common/create-axios-request";

const updateDashboardRequest = createAxiosRequest<Dashboard>({
  endpoint: "actions/dashboards/update-dashboard",
});

export { updateDashboardRequest };
