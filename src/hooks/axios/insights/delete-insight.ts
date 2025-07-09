import { createAxiosRequest } from "../common/create-axios-request";

const deleteInsightRequest = createAxiosRequest<any>({
  endpoint: "actions/insights/delete-insight",
});

export { deleteInsightRequest };
