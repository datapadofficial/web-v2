import { Insight } from "../../../models/insight";
import { createAxiosRequest } from "../common/create-axios-request";

const createInsightRequest = createAxiosRequest<Insight>({
  endpoint: "actions/insights/create-insight",
});

export { createInsightRequest };
