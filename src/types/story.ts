import { Insight } from "./insight";

interface StorySys {
  created_at: Date;
}

export interface Story {
  _id?: string;
  title: string;
  description: string;
  expanded_insights: Insight[];
  period: "day" | "week" | "month";
  sys?: StorySys;
}
