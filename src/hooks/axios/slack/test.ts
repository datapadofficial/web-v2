import { createAxiosRequest } from "../common/create-axios-request";

const sendTestMessageRequest = createAxiosRequest<any>({
  endpoint: "actions/slack/test",
});

export { sendTestMessageRequest };
