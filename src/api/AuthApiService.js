// import { ApiClient } from "./ApiClient";

// export const userRegisterApiService = (user) => {
//   return ApiClient.post("/user/auth/register", user);
// };


import { ApiClient } from "./ApiClient";

export const userRegisterApiService = (user) => {
  return ApiClient.post("/user/auth/register", user)
    .then(response => {
      console.log("User registered successfully:", response.data);
      return response.data;
    })
    .catch(error => {
      console.error("Error registering user:", error);
      throw error;
    });
};


export const userLoginApiService = (authRequest) => {
  return ApiClient.post("/user/auth/login", authRequest)
    .then(response => {
      console.log("User Login successfully:", response.data);
      return response.data;
    })
    .catch(error => {
      console.error("Error login user:", error);
      throw error;
    });
};