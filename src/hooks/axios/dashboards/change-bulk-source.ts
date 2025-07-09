import { createAxiosRequest } from "../common/create-axios-request";

const changeBulkSource = createAxiosRequest<any>({
  endpoint: "actions/dashboards/change-bulk-source",
});

export { changeBulkSource };
