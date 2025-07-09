import { createAxiosRequest } from "../common/create-axios-request";

const getDataRequest = createAxiosRequest<any>({
  endpoint: "actions/integrations/get-data",
});

export { getDataRequest };
