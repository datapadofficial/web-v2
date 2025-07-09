import Column from "./column";
import { DateRange } from "./date-range";

export interface Insight {
  _id: string;
  workspace_id: string;
  title: string;
  description: string;
  period: "day" | "week" | "month";
  period_date_range: DateRange;
  tags: string[];
  direction: "positive" | "negative";
  score: number;
  insight_date: string;
  integration: "string";
  source_id: "string";
  type:
    | "forecast"
    | "daily_period_comparison"
    | "weekly_period_comparison"
    | "monthly_period_comparison"
    | "anomaly"
    | "change_point"
    | "scorecard"
    | "moving_average"
    | "daily_dimension_lookup"
    | "weekly_dimension_lookup"
    | "monthly_dimension_lookup";
  assets?: Asset[];
  columns: {
    metrics: string[];
    dimensions: string[];
  };
  expanded_columns: {
    metrics: Column[];
    dimensions: Column[];
  };
  sys: {
    created_at: string;
    updated_at: string;
  };
  dimension_values: string[];
  data?: {
    past_value: number;
    new_value: number;
  };
  dimension_datas?: {
    id: string;
    new_value: number;
    past_value: number;
  }[];
}

export interface Asset {
  type: "table" | "image";
  content: any;
}

export interface TableAsset extends Asset {
  type: "table";
  content: TableAssetContent;
}

export interface TableAssetContent {
  columns: {
    title: string;
    accessor: string;
  }[];
  data: any[];
}
