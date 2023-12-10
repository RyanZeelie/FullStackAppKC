import axiosClient from "./AxiosClient";

const userRoutes = {
  getAllUsers: `/get-all-users`,
};

export const getAllUsers = async () => {
  let response = await axiosClient.get(userRoutes.getAllUsers);
  return response.data
};
