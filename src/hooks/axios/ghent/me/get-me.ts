import {
  createAxiosRequest,
  createGhentConfig,
} from "../../common/create-axios-request";
import { APIResponse } from "../../common/create-axios-request";
import { User } from "@/models/user";
import { Workspace } from "@/models/workspace";
import { Source } from "@/models/source";
import { Chat } from "@/models/chat";
import { Report } from "@/models/report";

interface UserData {
  user: User;
  workspaces: Workspace[];
  workspace: Workspace | null;
  sources: Source[];
  chats: Chat[];
  reports: Report[];
}

/**
 * Get the current user data from Ghent including workspaces, sources, chats and reports
 */
const getMeRequest = (workspaceId?: string): Promise<APIResponse<UserData>> => {
  const request = createAxiosRequest<UserData>({
    method: "GET",
    endpoint: "/workspaces/get-me",
    config: createGhentConfig(workspaceId),
  });

  return request();
};

export { getMeRequest, type UserData };
