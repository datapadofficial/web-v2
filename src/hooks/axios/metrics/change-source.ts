import { createAxiosRequest } from "../common/create-axios-request";

const changeSource = createAxiosRequest<any>({
  endpoint: "actions/metrics/change-source",
});

export { changeSource };
