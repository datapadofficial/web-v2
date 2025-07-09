import { AxiosResponse } from "axios"; // import this if not already imported
import { SingleIntegration } from "src/models/integrations";
import { axiosClient } from "../common/axios-client";

type IntegrationRequest = {
  integrations: SingleIntegration[];
};

const getIntegrations = async (): Promise<
  AxiosResponse<IntegrationRequest>
> => {
  try {
    const response = await axiosClient.post<IntegrationRequest>(
      "/actions/integrations/get-integrations",
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export { getIntegrations };
