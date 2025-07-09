import Dashboard from "./dashboard";

interface Workspace {
  _id: string;
  name: string;
  image_url?: string;
  timezone?: string;
  dashboards: Dashboard[];
  admins: string[];
  subscription: Subscription;
  is_v2?: boolean;
  sys: {
    created_at: string;
  };
  features: {
    ai: boolean;
    stories: boolean;
    scorecard: boolean;
  };
  notifications: {
    slack: {
      access_token: string;
      channel: any;
    };
  };
}

interface Subscription {
  plan_id: string;
  stripe_details?: any;
}

export { type Workspace, type Workspace as default };
