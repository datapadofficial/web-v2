import { Source } from "./source";

interface Column {
  _id: string;
  column_id?: string;
  id: string;
  level: string;
  type: string;
  data_type: string;
  dimension_type: string;
  name: string;
  enabled: boolean;
  integration: string;
  table: string;
  category: string;
  misc?: any;
  source_id?: string;
  aggregation?: string;
  aggregation_operators?: {
    calculated: string[];
    enabled: string[];
  };
  ai: {
    insightable: boolean;
  };
  inversed?: boolean;
  priority: string;
  starred?: boolean;
  is_default_date?: boolean;
  source?: Source;
  is_custom?: boolean;
  filters?: {
    property?: string;
    condition?: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "in" | "nin";
    values?: any;
    type: "string" | "number" | "boolean" | "raw";
    raw_value?: string;
  }[];
}

interface SourceColumn extends Column {
  source_id: string;
}

export { type Column, type SourceColumn, type Column as default };
