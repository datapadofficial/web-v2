interface DateRangeFilter {
  id: string;
  label: string;
  past_period_label?: string;
  data: DateRange;
}
interface DateRange {
  type: "custom" | "exact" | "default";
  offset: 0 | -1;
  period: "day" | "week" | "month" | "year";
  unit: number;
  includeCurrent: boolean;
  fullPeriod: boolean;
  startDate: string;
  endDate: string;
}

const defaultDateRange = {
  type: "default",
  offset: 0,
  period: "day",
  fullPeriod: false,
  unit: 0,
  includeCurrent: false,
  startDate: "",
  endDate: "",
} as DateRange;

const defaultDateRangeFilter = {
  id: "lastWeek",
  label: "Last Week",
  past_period_label: "previous week",
  data: {
    type: "custom",
    offset: -1,
    period: "week",
    fullPeriod: true,
    unit: 1,
    includeCurrent: false,
  },
} as DateRangeFilter;

export {
  type DateRange,
  type DateRangeFilter,
  defaultDateRange,
  defaultDateRangeFilter,
};
