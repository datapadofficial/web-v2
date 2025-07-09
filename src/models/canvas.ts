import { Sys } from "./sys";

type CanvasAction = {
  type: "append" | "edit" | "remove" | "clear";
  status: "complete" | "partial";
  node_id: number;
  section_text: string;
};

type CanvasSection = {
  node_id: number;
  section_text: string;
};

type Canvas = {
  _id: string;
  title: string;
  sections: CanvasSection[];
  sys: {
    created_at: Date;
    updated_at: Date;
  };
};

const emptyCanvas: Canvas = {
  _id: "",
  title: "New Canvas",
  sections: [],
  sys: {
    created_at: new Date(),
    updated_at: new Date(),
  },
};

export type { CanvasAction, Canvas, CanvasSection };
export { emptyCanvas };
