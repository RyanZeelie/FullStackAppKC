import axiosClient from "./AxiosClient";

const routes = {
  getAllGrades: "./mockdata/mock-grades.json",
  getAllClasses: "./mockdata/mock-classes.json",
  getAllStudents: "./mockdata/mock-students.json"
};

export const getGrades = async () => {
  let response = await axiosClient.get(routes.getAllGrades);
  return response.data;
};
export const getClasses = async () => {
    let response = await axiosClient.get(routes.getAllClasses);
    return response.data;
  };
  export const getStudents= async () => {
    let response = await axiosClient.get(routes.getAllStudents);
    return response.data;
  };
