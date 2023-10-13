import axios from "axios";

const routes = {
  getAllGrades: "./mockdata/mock-grades.json",
  getAllClasses: "./mockdata/mock-classes.json",
  getAllStudents: "./mockdata/mock-students.json"
};

export const getGrades = async () => {
  let response = await axios.get(routes.getAllGrades);
  return response.data;
};
export const getClasses = async () => {
    let response = await axios.get(routes.getAllClasses);
    return response.data;
  };
  export const getStudents= async () => {
    let response = await axios.get(routes.getAllStudents);
    return response.data;
  };
