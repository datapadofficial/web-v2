import { type Dashboard } from "../../../models/dashboard";
import { createAxiosRequest } from "../common/create-axios-request";

const getDashboardRequest = createAxiosRequest<Dashboard>({
  endpoint: "actions/dashboards/get-dashboard",
});

export { getDashboardRequest };
