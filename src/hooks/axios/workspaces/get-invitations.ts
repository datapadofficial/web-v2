import { type Invitation } from "../../../models/invitation";
import { createAxiosRequest } from "../common/create-axios-request";

const getInvitationsRequest = createAxiosRequest<Invitation[]>({
  endpoint: "actions/workspaces/get-invitations",
});

export { getInvitationsRequest };
