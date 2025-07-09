import { createAxiosRequest } from "../common/create-axios-request";

const getNewDataSources = createAxiosRequest<any>({
  endpoint: "actions/integrations/get-new-data-sources",
});

export { getNewDataSources };
