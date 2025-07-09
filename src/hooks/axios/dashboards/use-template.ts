import { type Dashboard } from "../../../models/dashboard";
import { createAxiosRequest } from "../common/create-axios-request";

const useTemplateRequest = createAxiosRequest<Dashboard>({
  endpoint: "actions/dashboards/use-template",
});

export { useTemplateRequest };
