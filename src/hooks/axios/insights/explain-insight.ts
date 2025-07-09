import { createAxiosRequest } from "../common/create-axios-request";

const explainInsightRequest = createAxiosRequest<any>({
  endpoint: "actions/insights/explain-insight",
});

export { explainInsightRequest };
