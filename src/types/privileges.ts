import { type User } from "./user";

interface Privileges {
  view: Privilege;
  edit: Privilege;
}

interface Privilege {
  type: "public" | "private" | "custom";
  users: string[];
  usersExpanded?: User[];
}

export { type Privilege, type Privileges, type Privileges as default };
