import {
  createAxiosRequest,
  createGhentConfig,
  APIResponse,
} from "@/lib/create-axios-request";
import { User } from "@/types/user";
import { Workspace } from "@/types/workspace";
import { Source } from "@/types/source";
import { Chat } from "@/types/chat";
import { Report } from "@/types/report";

export interface UserData {
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
export const getMeRequest = (
  workspaceId?: string
): Promise<APIResponse<UserData>> => {
  const request = createAxiosRequest<UserData>({
    method: "GET",
    endpoint: "/workspaces/get-me",
    config: createGhentConfig(workspaceId),
  });

  return request();
};
