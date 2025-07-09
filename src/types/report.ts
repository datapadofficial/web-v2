import { DataSet } from "../models/data";

type EmailConfig = {
  enabled: boolean;
  emails: string[];
};

type SlackConfig = {
  enabled: boolean;
};

type EnabledChannels = {
  email: EmailConfig;
  slack: SlackConfig;
};

type HourlyOptions = {
  hours: number[];
};

type DailyOptions = {
  time: number;
};

type WeeklyOptions = {
  days: number[];
  time: number;
};

type MonthlyOptions = {
  dates: number[];
  time: number;
};

type Scheduling = {
  enabled: boolean;
  frequency: string;
  hourly_options: HourlyOptions;
  daily_options: DailyOptions;
  weekly_options: WeeklyOptions;
  monthly_options: MonthlyOptions;
  cron_expression: string;
};

type ReportHistory = {
  prompt?: string;
  analysis?: string;
  datasets?: DataSet[];
  sys?: {
    createdAt?: string;
    updatedAt?: string;
  };
};

type Report = {
  _id?: string;
  name: string;
  sources: string[];
  prompt: string;
  scheduling: Scheduling;
  enabled_channels: EnabledChannels;
  history?: ReportHistory[];
  public_code?: string;
  is_public?: boolean;
  theme: string;
  sys?: {
    created_at: string;
    updated_at?: string;
  };
};

export type {
  Report,
  Scheduling,
  EnabledChannels,
  EmailConfig,
  SlackConfig,
  HourlyOptions,
  DailyOptions,
  WeeklyOptions,
  MonthlyOptions,
};
