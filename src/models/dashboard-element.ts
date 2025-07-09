interface DashboardElement {
  _id: string;
  type: "text" | "header" | "image" | "divider" | "video";
  content: any;
  layout: any; // TODO: make type safe
}

interface DashboardTextElement extends DashboardElement {
  type: "text";
  content: string;
}
interface DashboardHeaderElement extends DashboardElement {
  type: "header";
  content: string;
}

interface DashboardImageElement extends DashboardElement {
  type: "image";
  content: {
    url: string;
    fit: "cover" | "contain";
    position?: number[];
    unsplash?: {
      id: string;
      user: string;
      attribution_link: string;
    };
  };
}

interface DashboardVideoElement extends DashboardElement {
  type: "video";
  content: {
    src: string;
  };
}

interface DashboardDividerElement extends DashboardElement {
  type: "divider";
  content: {
    height: number;
  };
}

export {
  type DashboardElement,
  type DashboardTextElement,
  type DashboardImageElement,
  type DashboardVideoElement,
  type DashboardDividerElement,
  type DashboardHeaderElement,
};
