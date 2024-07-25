import { ApiClient } from "./ApiClient";

export const userRegisterApiService = (user) => {
  return ApiClient.post("/user/auth/register", user);
};
