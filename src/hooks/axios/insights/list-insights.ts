import { createAxiosRequest } from "../common/create-axios-request";

const listInsightsRequest = createAxiosRequest<any>({
  endpoint: "actions/insights/list-insights",
});

export { listInsightsRequest };
