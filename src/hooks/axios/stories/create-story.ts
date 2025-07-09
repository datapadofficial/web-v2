import { createAxiosRequest } from "../common/create-axios-request";

const createStoryRequest = createAxiosRequest<any>({
  endpoint: "actions/stories/create",
});

export { createStoryRequest };
