import { createAxiosRequest } from "../common/create-axios-request";

const slackAuthRequest = createAxiosRequest<any>({
  endpoint: "actions/slack/auth",
});

export { slackAuthRequest };
