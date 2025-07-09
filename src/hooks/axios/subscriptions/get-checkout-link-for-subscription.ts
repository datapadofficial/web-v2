import { createAxiosRequest } from "../common/create-axios-request";

const getCheckoutLinkForSubscription = createAxiosRequest<string>({
  endpoint: "/actions/subscriptions/get-checkout-link-for-subscription",
});

export { getCheckoutLinkForSubscription };
