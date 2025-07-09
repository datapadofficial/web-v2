import { createAxiosRequest } from "../common/create-axios-request";

const runRawQueryRequest = createAxiosRequest<any>({
  endpoint: "actions/integrations/run-raw-query",
});

export { runRawQueryRequest };
