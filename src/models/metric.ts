import { type ExtractedInformation } from "./extracted-information";

enum MetricColor {
  RED = "RED",
  ORANGE = "ORANGE",
  YELLOW = "YELLOW",
  GREEN = "GREEN",
  BLUE = "BLUE",
  PURPLE = "PURPLE",
}

interface Metric extends ExtractedInformation {
  _id: string;
  color: MetricColor;
}

interface PredefinedMetric extends Metric {
  predefined_id: string;
  definition: string;
  reason: string;
}

export {
  type Metric,
  type Metric as default,
  MetricColor,
  type PredefinedMetric,
};
