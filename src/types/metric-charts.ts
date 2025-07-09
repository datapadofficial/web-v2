import { DateRange } from "./date-range";
import { ChartData } from "./extracted-information";
import { Filters } from "./filters";
import { MetricField } from "./metric-fields";
import { NotificationPreferences } from "./notification-preferences";
import { type Privileges } from "./privileges";

enum ChartTypes {
  SingleValueChart = "SINGLE_VALUE_CHART",
  LineChart = "LINE_CHART",
  BarChart = "BAR_CHART",
  PieChart = "PIE_CHART",
  TableChart = "TABLE_CHART",
  FunnelChart = "FUNNEL_CHART",
  MapChart = "MAP_CHART",
}

enum MetricFeatureType {
  NotSupported = "NOT_SUPPORTED",
  Available = "AVAILABLE",
  Premium = "PREMIUM",
  WillBeAvailableSoon = "WILL_BE_AVAILABLE_SOON",
}

interface Sys {
  created_at: Date;
  created_by: string;
}

interface MetricIntegration {
  integration: string;
  source_id?: string;
  predefined_id: string;
  table: string;
}

export type MetricCardAggregations = "NONE" | "SUM" | "AVG" | "LAST";

type Settings = {
  aggregation?: MetricCardAggregations;
  date_range: DateRange;
  compare: boolean;
  filters: Filters;
  table: string;
  header: boolean;
  selection_type: "column" | "row" | "single";
};

type Formatting = {
  chart_type: ChartTypes;
  fields: MetricField[];
};

export type Information = {
  title: string;
  icon: string;
};

export type Annotation = {
  point: {
    x: number;
    y: number;
    xAxis: number;
    yAxis: number;
  };
  text: string;
};

interface Metric {
  type?: string;
  settings: Settings;
  data: ChartData;
  formatting: Formatting;
  layout: any; // TODO: make type safe
  integration: MetricIntegration;
  information: Information;
  notification_preferences: NotificationPreferences;
  workspace_id: string;
  _id: string;
  privileges: Privileges;
  responsible?: string;
  field?: any;
  updatedLocalTime?: number;
  is_scratch?: boolean;
  is_demo?: boolean;
  status?: "idle" | "loading" | "error" | "loaded" | string;
  annotations?: Annotation[];
}

interface PredefinedMetric extends Metric {
  predefined_id: string;
  definition: string;
  reason: string;
  id: string;
  defaults: PredefinedMetricDefaults;
}

interface PredefinedMetricDefaults {
  icon: string;
  color: string;
  chart_type: ChartTypes;
}

export {
  ChartTypes,
  type Metric,
  type MetricIntegration,
  MetricFeatureType,
  type PredefinedMetric,
  type Sys,
  type Settings,
};
