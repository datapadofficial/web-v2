import { Source } from "../../../models/source";
import { createAxiosRequest } from "../common/create-axios-request";

const listSourcesRequest = createAxiosRequest<Source[]>({
  endpoint: "actions/sources/list-sources",
});

export { listSourcesRequest };
