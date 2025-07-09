import { type Metric } from "./metric-charts";
import { type Privileges } from "./privileges";
import { type Sys } from "./sys";
import { type DashboardElement } from "./dashboard-element";
import Color from "color";
import { DateRange } from "./date-range";

enum DashboardMetricSize {
  xSmall = "xSmall",
  Small = "small",
  Medium = "medium",
  Large = "large",
  xLarge = "xLarge",
  xxLarge = "xxLarge",
}

type FontType = "serif" | "sans-serif" | "mono";

type ColorsObject = {
  BLUE?: string | Color;
  PURPLE?: string | Color;
  RED?: string | Color;
  ORANGE?: string | Color;
  YELLOW?: string | Color;
  GREEN?: string | Color;
};

interface Dashboard {
  _id: string;
  description?: string;
  icon: string;
  metrics: (Metric | DashboardElement)[];
  privileges: Privileges;
  sys: Sys;
  title: string;
  workspace_id: string;
  public_resource: PublicLink;
  workspace_image_url?: string;
  reporting: {
    active: boolean;
    emails: string[];
    schedule: ReportingSchedule;
  };
  formatting?: {
    background?: {
      url: string;
      position?: number[];
      unsplash?: {
        id: string;
        user: string;
        attribution_link: string;
      };
    };
    colors?: ColorsObject;
    font_type?: FontType;
    show_integration_icons?: boolean;
    show_emojis?: boolean;
  };
  settings: {
    date_range: DateRange;
    compare: boolean;
  };
  is_demo?: boolean;
}

interface ReportingSchedule {
  cron: string;
  options: ReportingScheduleOptions;
}

interface ReportingScheduleOptions {
  frequency: string;
  day?: string;
  hour: string;
}

interface PublicLink {
  _id: string;
  user_id: string;
  public_id: string;
  expires_in: number;
  data: any;
  sys: Sys;
}

export {
  type Dashboard,
  type Dashboard as default,
  DashboardMetricSize,
  type FontType,
  type ColorsObject,
  type ReportingSchedule,
  type ReportingScheduleOptions,
};
