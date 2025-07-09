import { Source } from "../../../models/source";
import { createAxiosRequest } from "../common/create-axios-request";

const updateSourceRequest = createAxiosRequest<Source>({
  endpoint: "actions/sources/update-source",
});

export { updateSourceRequest };
