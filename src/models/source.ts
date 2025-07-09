import Column from "./column";
import { View } from "./data";
import User from "./user";

export interface Source {
  _id?: string;
  id: string;
  name: string;
  integration: string;
  workspace_id?: string;
  status?: "active" | "generating" | "deleting" | "error";
  credentials?: any;
  user?: User;
  columns?: Column[];
  views?: View[];
}
