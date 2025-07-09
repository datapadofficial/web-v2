import { createAxiosRequest } from "../common/create-axios-request";

const getPotentialColumnsRequest = createAxiosRequest<any>({
  endpoint: "actions/integrations/get-potential-columns",
});

export { getPotentialColumnsRequest };

