import { Source } from "../../../models/source";
import { createAxiosRequest } from "../common/create-axios-request";

const createSourceRequest = createAxiosRequest<Source>({
  endpoint: "actions/sources/create-source",
});

export { createSourceRequest };
