import { createAxiosRequest } from "../common/create-axios-request";

const getDailyDigestRequest = createAxiosRequest<any>({
  endpoint: "actions/insights/get-daily-digest",
});

export { getDailyDigestRequest };
