import axiosClient from "./AxiosClient";

const authRoutes = {
  login: "login",
  logout: "logout",
};

export const login = async (loginRequest) => {
  let response = await axiosClient.post(authRoutes.login, loginRequest);
  return response.data;
};

export const logout = async () => {
  let response = await axiosClient.post(authRoutes.logout);
  return response.data;
};
