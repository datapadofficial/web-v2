import Column from "./column";
import { DashboardMetricSize } from "./dashboard";
import { type Privileges } from "./privileges";
import { type Sys } from "./sys";

enum Type {
  CARDINAL = "CARDINAL",
  QUANTITY = "QUANTITY",
  PERCENT = "PERCENT",
  MONEY = "MONEY",
}

enum ChartType {
  LINE_CHART = "LINE_CHART",
  PIE_CHART = "PIE_CHART",
  BAR_CHART = "BAR_CHART",
  AREA_CHART = "AREA_CHART",
  TABLE_CHART = "TABLE_CHART",
}

type ItemValue = null | string | number;
type ExtractedInformationDataItem = Record<string, ItemValue>;

enum MetricTypes {
  MANUAL = "MANUAL",
  GOOGLE_SHEETS = "GOOGLE_SHEETS",
  GOOGLE_ANALYTICS = "GOOGLE_ANALYTICS",
  FACEBOOK_ADS = "FACEBOOK_ADS",
  SHOPIFY = "SHOPIFY",
  SQL = "SQL",
  STRIPE = "stripe",
  HUBSPOT = "hubspot",
}

interface MetricSources {
  _id: string;
  type: MetricTypes;
  has_error: boolean;
}

interface ExtractedInformation {
  title: string;
  type: Type;
  chart_type?: ChartType;
  value?: number;
  time?: Date;
  symbol?: string;
  data: ChartData;
  metadata?: any[][];
  goal?: number;
  workspace_id: string;
  source?: MetricSources;
  sys: Sys;
  privileges: Privileges;
  header?: { title: string; dimension: string; value: string };
  size?: DashboardMetricSize;
  icon: string;
}

interface ChartData {
  aggregation: number | null;
  aggregation_diff: number;
  items: ExtractedInformationDataItem[];
  previous_items?: ExtractedInformationDataItem[];
  cache_date: string;
}

interface ChartDataWithColumns extends ChartData {
  metrics: Column[];
  dimensions: Column[];
}

export {
  type ChartData,
  type ChartType,
  type ExtractedInformation,
  type ExtractedInformationDataItem,
  type MetricSources,
  type MetricTypes,
  type Type,
  type ChartDataWithColumns,
};
