import * as M from "./filters";

type PrefixSuffixType = "none" | "prefix" | "suffix";
type AxisType = "left" | "right";

export type Period = "hour" | "day" | "week" | "month" | "year" | "";

export type FieldType = "integer" | "date" | "string" | "boolean";

interface MetricField {
  axis: "left" | "right";
  color: string;
  category: "LABEL_SORTED" | "LABEL" | "VALUE";
  id: string;
  title: string;
  show_value: boolean;
  type: FieldType;
  pre_suf_type: PrefixSuffixType;
  pre_suffix: string;
  goal_value: number;
  show_goal_value: boolean;
  combo_chart: "none" | "bar" | "line";
  aggregation: string;
  aggregation_operators?: AggregationOperators;
  table_alias: string;
  dimension_type?: M.DimensionTypes;
  period: Period;
  action_collection?: string;
}

interface AggregationOperators {
	calculated: string[];
	enabled: string[];
}

export { type MetricField, type PrefixSuffixType, type AxisType };
