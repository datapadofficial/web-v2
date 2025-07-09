import { createAxiosRequest } from "../common/create-axios-request";

const getStoryRequest = createAxiosRequest<any>({
  endpoint: "actions/stories/get",
});

export { getStoryRequest };