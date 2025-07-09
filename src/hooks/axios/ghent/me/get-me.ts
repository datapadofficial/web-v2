import {
  createAxiosRequest,
  createGhentConfig,
} from "../../common/create-axios-request";
import { APIResponse } from "../../common/create-axios-request";

interface UserData {
  user: any;
  workspaces: any[];
  workspace: any | null;
  sources: any[];
  chats: any[];
  reports: any[];
}

/**
 * Get the current user data from Ghent including workspaces, sources, chats and reports
 */
const getMeRequest = (workspaceId?: string): Promise<APIResponse<UserData>> => {
  console.log(`Creating getMeRequest with workspaceId: ${workspaceId}`);
  console.log(`Ghent BASE URL: ${process.env.NEXT_PUBLIC_GHENT_BASE_URL}`);

  const request = createAxiosRequest<UserData>({
    method: "GET",
    endpoint: "/workspaces/get-me",
    config: createGhentConfig(workspaceId),
  });

  return request();
};

export { getMeRequest, type UserData };
