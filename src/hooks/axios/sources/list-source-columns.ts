import SourceColumn from "src/models/source-column";

import { createAxiosRequest } from "../common/create-axios-request";

const listSourceColumnsRequest = createAxiosRequest<any>({
  endpoint: "actions/sources/list-source-columns",
});

export { listSourceColumnsRequest };
