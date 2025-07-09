import { createAxiosRequest } from "../common/create-axios-request";

const testDatabaseConnectionRequest = createAxiosRequest<string>({
  endpoint: "actions/integrations/test-database-connection",
});

export { testDatabaseConnectionRequest };
