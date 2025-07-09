import { type Dashboard } from "./dashboard";

interface MyWorkspace {
  _id?: string;
  name: string;
  dashboards: Dashboard[];
}

interface Me {
  _id: string;
  id: string;
  email: string;
  display_name: string;
  workspaces: MyWorkspace[];
}

export { type Me, type Me as default, type MyWorkspace };
