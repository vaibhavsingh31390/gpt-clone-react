import { API_HOST, API_HOST_DEV, APP_ENV } from "./../../config";

const routes = {
  host: APP_ENV === "DEV" ? API_HOST_DEV : API_HOST,
  login: `/api/v1/users/login`,
  logout: `/api/v1/users/logout`,
  register: `/api/v1/users/register`,
  fetchAllChats: `/api/v1/chats/get`,
  fetchSingleChat: `/api/v1/chats/get/`,
  deleteSingleChat: `/api/v1/chats/delete/`,
};

export default routes;
