import { Metric } from "../../../models/metric-charts";
import { createAxiosRequest } from "../common/create-axios-request";

const searchMetricsRequest = createAxiosRequest<Metric[]>({
  endpoint: "actions/metrics/search-metrics",
});

export { searchMetricsRequest };
