import { Column } from "../../../models/column";
import { createAxiosRequest } from "../common/create-axios-request";

const updateColumnsRequest = createAxiosRequest<Column[]>({
  endpoint: "actions/columns/update",
});

export { updateColumnsRequest };
