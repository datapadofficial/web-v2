interface MetricDataSource {
  _id: string;
  enable: boolean;
  cellTitle: string;
  cellSubtitle?: string;
  image: string;
  screen?: string;
}

export { type MetricDataSource, type MetricDataSource as default };
