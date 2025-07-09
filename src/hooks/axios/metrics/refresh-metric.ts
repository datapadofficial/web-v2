import { Metric } from "../../../models/metric-charts";
import { createAxiosRequest } from "../common/create-axios-request";

const refreshMetricRequest = createAxiosRequest<Metric>({
  endpoint: "actions/metrics/clear-cache",
});

export { refreshMetricRequest };
