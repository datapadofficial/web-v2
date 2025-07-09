interface FacebookAdsTokenInfo {
  access_token: string;
  data_access_expiration_time: number;
  expires_in: number;
  long_lived_token?: string;
}

interface FacebookAdsSelectedItem {
  id: string;
  name: string;
}

interface FacebookAdsItem {
  _id: string;
  account: string;
  dimension: string;
  dimension_name: string;
  metric: string;
  metric_name: string;
  date_range: string;
  date_range_name: string;
  account_id: string;
  campaign_url: string;
  token_id: string;
  workspace_id: string;
}

interface FacebookAccount {
  name: string;
  id: string;
}

export {
  type FacebookAccount,
  type FacebookAdsItem,
  type FacebookAdsSelectedItem,
  type FacebookAdsTokenInfo,
};
