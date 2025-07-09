import { Column } from "../../../models/column";
import { createAxiosRequest } from "../common/create-axios-request";

const listColumnsRequest = createAxiosRequest<Column[]>({
  endpoint: "actions/columns/list",
});

export { listColumnsRequest };
