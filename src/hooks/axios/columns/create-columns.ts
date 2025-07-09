import { Column } from "../../../models/column";
import { createAxiosRequest } from "../common/create-axios-request";

const createColumnsRequest = createAxiosRequest<Column[]>({
  endpoint: "actions/columns/create",
});

export { createColumnsRequest };
