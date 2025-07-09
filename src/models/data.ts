import Column from "./column";

export interface DataSet {
  id: string;
  data: any | Array<Record<string, any>>;
  metadata: {
    type: "structured_data" | "unstructured_data" | "web_research";
    columns?: Column[];
    query?: string;
    source_id?: string;
    source_name?: string;
    source_integration?: string;
    sites?: {
      url: string;
      title: string;
      snippet: string;
      relevance: number;
    }[];
  };
}

export type GroupedDataSet = {
  dataSets: DataSet[];
  metadata: {
    type: "structured_data" | "unstructured_data" | "web_research";
    columns?: Column[];
    query?: string;
    source_id?: string;
    source_name?: string;
    source_integration?: string;
    sites?: {
      url: string;
      title: string;
      snippet: string;
      relevance: number;
    }[];
  };
};

export type View = {
  _id?: string;
  name: string;
  description: string;
  info: any;
  workspace_id?: string;
  source_id?: string;
  
};
