import { Chat } from "../../../models/chat";
import { createAxiosRequest } from "../common/create-axios-request";

const listChatsRequest = createAxiosRequest<Chat[]>({
  method: "GET",
  endpoint: "chats",
  config: {
    baseURL: process.env.NEXT_PUBLIC_GHENT_BASE_URL,
  },
});

export { listChatsRequest };
