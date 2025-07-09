import { createAxiosRequest } from "../common/create-axios-request";

const getAdvancedDataRequest = createAxiosRequest<any>({
  endpoint: "actions/integrations/get-advanced-data",
});

export { getAdvancedDataRequest };
