import Workspace from "../../../models/workspace";
import { createAxiosRequest } from "../common/create-axios-request";

const setWorkspacePropertyRequest = createAxiosRequest<Workspace>({
  endpoint: "/actions/workspaces/set-property",
});

export { setWorkspacePropertyRequest };
