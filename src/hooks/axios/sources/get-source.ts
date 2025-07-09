import { Source } from "../../../models/source";
import { createAxiosRequest } from "../common/create-axios-request";

const getSourceRequest = createAxiosRequest<Source>({
  endpoint: "actions/sources/get-source",
});

export { getSourceRequest };
