import { createAxiosRequest } from "../common/create-axios-request";

const setMetricProperty = createAxiosRequest<any>({
  endpoint: "actions/metrics/set-property",
});

export { setMetricProperty };
