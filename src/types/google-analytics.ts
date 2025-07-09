interface AnalyticsItem {
  _id: string;
  code: string;
  channel_token?: string;
  view_id: string;
  metric: string;
  dimension: string;
  date_range: string;
  workspace_id: string;
  token_id: string;
  account_name: string;
  account_url: string;
  sort: string;
  source: "ua" | "ga4";
  sys: {
    created_at: Date;
    created_by: string;
    updated_at?: Date;
    updated_by?: string;
  };
}

interface GAReport {
  headers: ReportHeader[];
  data: any[];
}

interface PredefinedGAReport extends GAReport {
  info: {
    icon: string;
    title: string;
    chart_type: string;
    color: string;
    definition: string;
    reason: string;
    predefined_id: string;
    goal: number;
    symbol: string;
    size: string;
  };
}

interface ReportHeader {
  dimension: string;
  metric: string;
}

interface GAAccount {
  viewId: string;
  webPropertyId: string;
  name: string;
  accountId: string;
  accountName: string;
  accountURL: string;
}

interface GAMetadataItem {
  id: string;
  name: string;
  group: string;
  dataType: string;
}

export {
  type AnalyticsItem,
  type GAAccount,
  type GAMetadataItem,
  type GAReport,
  type PredefinedGAReport,
  type ReportHeader,
};
