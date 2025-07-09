
import { Workspace } from "../../../models/workspace";
import { createAxiosRequest } from "../common/create-axios-request";

const getWorkspaceRequest = createAxiosRequest<Workspace>({
  endpoint: "actions/workspaces/get-workspace",
});

export { getWorkspaceRequest };
