import { type Workspace } from "./workspace";

interface Invitation {
  accept_date: string;
  _id?: string;
  email: string;
  workspace: Workspace;
  role: string;
}

export { type Invitation, type Invitation as default };
