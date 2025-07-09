import { createAxiosRequest } from "../common/create-axios-request";

const listStoriesRequest = createAxiosRequest<any>({
  endpoint: "actions/stories/list",
});

export { listStoriesRequest };
