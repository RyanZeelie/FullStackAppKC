import axios from "axios";

// TODO : Create a default Axios Client
const baseURL = "https://localhost:7232";
const studentRoutes = {
  getAllStudents: `${baseURL}/get-students`,
  createStudent: `${baseURL}/create-student`,
  updateStudent: `${baseURL}/update-student`
};

export const getStudents = async () => {
    let response = await axios.get(studentRoutes.getAllStudents);
    return response.data;
  };
  export const createStudent = async (student) => {
    let response = await axios.post(studentRoutes.createStudent, student);
    return response.data;
  };
  export const updateStudent = async (classModel) => {
    let response = await axios.put(studentRoutes.updateStudent, classModel);
    return response.data;
  };