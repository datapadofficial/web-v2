import { type PredefinedMetric } from "../../../models/metric-charts";
import { createAxiosRequest } from "../common/create-axios-request";

const getPredefinedMetricRequest = createAxiosRequest<PredefinedMetric>({
  endpoint: "actions/integrations/get-predefined-metric",
});

export { getPredefinedMetricRequest };
