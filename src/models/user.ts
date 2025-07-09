import { type Workspace } from "./workspace";

interface User {
  id: string;
  _id: string;
  email: string;
  display_name: string;
  workspaces: Workspace[];
  timezone: string;
  image_url?: string;
  password?: string;
  is_super_admin?: boolean;
  features?: {
    ai: boolean;
  };
}

export { type User, type User as default };
