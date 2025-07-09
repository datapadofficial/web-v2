import { createAxiosRequest } from "../common/create-axios-request";

const deleteSourceRequest = createAxiosRequest<string>({
  endpoint: "actions/sources/delete-source",
});

export { deleteSourceRequest };
