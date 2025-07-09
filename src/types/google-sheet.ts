// TODO: replace locale import from rnclient app
export enum LocaleType {
  Auto = "auto",
  GenericAmerican = "generic-american",
  GenericEuropeAsia = "generic-europe-asia",
}

export default interface Sheet {
  properties: {
    index: number;
    sheetId: number;
    title: string;
  };
}

export interface SpreadSheet {
  id: string;
  name: string;
}

//TODO: there are multiple exports with SheetData name!
// export interface SheetData {
//   id: string;
//   name: string;
// }

export interface SheetItem {
  _id: string;
  workspace_id: string;
  code: string;
  spreadsheet_id: string;
  spreadsheet_name: string;
  sheet_id: number;
  sheet_name: string;
  data: SheetData[];
  sheet_data: any[][];
  token_id: string;
  dimension_range: string;
  value_range: string;
  channel_token: string;
  dimension_type: string;
  header?: { title: string; dimension: string; value: string };
  locale: LocaleType;
}

export interface SheetData {
  name: string;
  value: number;
  time?: Date;
}
