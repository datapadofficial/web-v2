import { createAxiosRequest } from "../common/create-axios-request";

const generateInsightRequest = createAxiosRequest<any>({
  endpoint: "actions/insights/generate-insight",
});

export { generateInsightRequest };
