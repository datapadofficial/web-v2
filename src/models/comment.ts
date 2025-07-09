import { type Sys } from "./sys";
import { type User } from "./user";

interface Comment {
  _id: string;
  workspace_id: string;
  metric_id: string;
  user_id: string;
  comment: string;
  user?: User;
  sys: Sys;
}

export { type Comment, type Comment as default };
