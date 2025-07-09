import { createAxiosRequest } from "../common/create-axios-request";

const getConfig = createAxiosRequest<any>({
  endpoint: "actions/config/get-config",
});

export { getConfig };
