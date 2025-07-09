// @ts-nocheck
type Message = any;

type Chat = {
  _id: string;
  workspace_id: string;
  user_id: string;
  name?: string;
  messages: ChatMessage[];
  accumulated_data?: Array<unknown>;
  canvas?: Canvas;
  sys: {
    createdAt: string;
    updatedAt: string;
  };
};

type ChatMessage = Message & {
  metricsForAi?: Array<{
    name: string;
    metric_id: string;
    integration: string;
  }>;
};

type ToolInvocation = {
  toolName: "checkInsights" | "getTimeSeriesData" | "getTotalData";
  args: Record<string, any>;
};

export { type Chat, type ChatMessage, type ToolInvocation };
