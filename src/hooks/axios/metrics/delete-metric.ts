import { Metric } from "../../../models/metric-charts";
import { createAxiosRequest } from "../common/create-axios-request";

const deleteMetricRequest = createAxiosRequest<Metric>({
  endpoint: "actions/metrics/delete-metric",
});

export { deleteMetricRequest };
