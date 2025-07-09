import { Metric } from "../../../models/metric-charts";
import { createAxiosRequest } from "../common/create-axios-request";

const getMetricRequest = createAxiosRequest<Metric>({
  endpoint: "actions/metrics/get-metric",
});

export { getMetricRequest };
