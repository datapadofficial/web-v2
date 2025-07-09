type plan = {
    plan: string;
    plan_name: string;
    price: number;
    discount: number;
    dashboard_limit: number;
    plan_meta: {
      description: string;
      dashboardLimit: string;
      dashboardLimitSubtitle: string;
      dashboardSubtitle: string;
      additionalDashboard: string;
      dataSources: string;
      users: string;
      dataSync: string;
      reporting: boolean | string;
      whiteLabeling: boolean | string;
      prioritySlackSupport: boolean | string;
      dedicatedAccountManager: boolean | string;
      dataSourceRequests: boolean | string;
      dashboardSetup: boolean | string;
      features: string[];
    };
  };
  
  const firstColumn: plan = {
    plan: "plan",
    plan_name: "Plan",
    price: 0,
    dashboard_limit: 0,
    discount: 0,
    plan_meta: {
      description: "Description",
      dashboardLimit: "Dashboards",
      dashboardLimitSubtitle: "",
      dashboardSubtitle:
        "Select from our flexible plans tailored both for small and larger teams.",
      additionalDashboard: "Additional Dashboard",
      dataSources: "Data Sources",
      users: "Users",
      dataSync: "Data-Sync",
      reporting: "Reporting",
      whiteLabeling: "White-Labeling",
      prioritySlackSupport: "Priority Slack Support",
      dedicatedAccountManager: "Dedicated Account Manager",
      dataSourceRequests: "Data Source Requests",
      dashboardSetup: "Dashboard Setup",
      features: [],
    },
  };
  
  export { firstColumn, type plan };
  