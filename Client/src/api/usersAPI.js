import axiosClient from "./AxiosClient";

const userRoutes = {
  getAllUsers: `/get-all-users`,
  createUser: `/create-user`,
  verifyResetToken: `/verify-reset-token`,
  updatePassword: `/update-password`,
  reActivate : `/re-activate-user`,
  getRoles : '/get-roles'
};

export const getAllUsers = async () => {
  let response = await axiosClient.get(userRoutes.getAllUsers);
  return response.data;
};

export const createUser = async (newUser) => {
  let response = await axiosClient.post(userRoutes.createUser, newUser);
  return response.data;
};

export const verifyResetToken = async ({queryKey}) => {
  let [resetToken] = queryKey
  let response = await axiosClient.get(`${userRoutes.verifyResetToken}?resetToken=${resetToken}`);
  return response.data;
};

export const updatePassword = async (passwordUpdateDetails) => {
  let response = await axiosClient.post(userRoutes.updatePassword, passwordUpdateDetails);
  return response.data;
};

export const reActivateUser = async (user) => {
  let response = await axiosClient.post(userRoutes.reActivate, user);
  return response.data;
};

export const getUserRolesList = async () =>{
  let response = await axiosClient.get(userRoutes.getRoles);
  return response.data;
}