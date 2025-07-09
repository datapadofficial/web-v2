import { createAxiosRequest } from "../common/create-axios-request";

const updateSubscription = createAxiosRequest<string>({
  endpoint: "/actions/subscriptions/update",
});

export { updateSubscription };

