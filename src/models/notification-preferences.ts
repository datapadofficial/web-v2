import { Sys } from "./metric-charts";

interface NotificationPreferences {
  _id: string;
  workspace_id: string;
  user_id: string;
  metric_id: string;
  notify_daily?: boolean;
  notify_on_goal?: boolean;
  sys: Sys;
}

export {
  type NotificationPreferences,
  type NotificationPreferences as default,
};
