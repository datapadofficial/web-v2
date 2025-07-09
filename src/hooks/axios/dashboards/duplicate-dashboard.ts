import { type Dashboard } from "../../../models/dashboard";
import { createAxiosRequest } from "../common/create-axios-request";

const duplicateDashboardRequest = createAxiosRequest<Dashboard>({
  endpoint: "actions/dashboards/duplicate-dashboard",
});

export { duplicateDashboardRequest };
