import { integrationColors } from "../presets/colors";

import { MetricFeatureType, PredefinedMetric } from "./metric-charts";
import { Source } from "./source";

interface Integrations {
  integrations: SingleIntegration[];
  name: string;
  id: string;
}

interface SingleIntegration {
  features: {
    clientRn: MetricFeatureType;
    clientWeb: MetricFeatureType;
    multipleAccounts: MetricFeatureType;
    predefinedMetrics: MetricFeatureType;
    queryable: MetricFeatureType;
    subdomain: MetricFeatureType;
    apiKey: MetricFeatureType;
    isBeta?: boolean;
  };
  driver: {
    name: string;
    version: string;
  };
  predefinedMetrics: PredefinedMetric[];
  id: string;
  title: string;
  color: string;
  name: string;
  enabled?: boolean;
  type?: string;
  tag?: string;
  config?: {
    views?: boolean;
    view_selection?: boolean;
    view_alias?: string;
  };
}

interface IntegrationDetail {
  accounts: Source[];
  integration: string;
}

interface IntegrationWithAPIKeyOptions {
  name?: string;
  url?: string;
  apiKey?: string;
}

interface IntegrationWithConnectionString {
  connection_string: string;
  database_schema: string;
  name: string;
}

const getColor = (integration: string, type: string) => {
  // @ts-ignore
  const integrationColor = integrationColors[integration];
  return integrationColor
    ? integrationColor[type]
    : integrationColors["stripe"]["button"];
};

interface IntegrationV2 {
  _id: string;
  title: string;
  tag: string;
  description: string;
  enabled: boolean;
  type: "database" | "third-party";
  config?: {
    views?: boolean;
    view_selection?: boolean;
    view_alias?: string;
  };
}

export {
  getColor,
  type SingleIntegration,
  type Integrations,
  type IntegrationDetail,
  type IntegrationWithAPIKeyOptions,
  type IntegrationWithConnectionString,
  type IntegrationV2,
};
