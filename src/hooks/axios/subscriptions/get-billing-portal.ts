import { createAxiosRequest } from "../common/create-axios-request";

const getBillingPortal = createAxiosRequest<string>({
  endpoint: "/actions/subscriptions/get-billing-portal",
});

export { getBillingPortal };

