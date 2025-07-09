interface MetricPin {
  _id: string;
  workspace_id: string;
  user_id: string;
  metrics: string[] | undefined;
}

export { type MetricPin, type MetricPin as default };
