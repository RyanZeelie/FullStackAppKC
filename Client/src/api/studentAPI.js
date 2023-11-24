import axios from "axios";

// TODO : Create a default Axios Client
const baseURL = "https://localhost:7232";
const studentRoutes = {
  getAllStudents: `${baseURL}/get-students`,
  createStudent: `${baseURL}/create-student`,
  updateStudent: `${baseURL}/update-student`,
  getStudentsByGrade : `${baseURL}/get-unassigned-students-by-grade`,
  getCurrentSemesterStudents : `${baseURL}/get-students-for-current-semester`,
  dropStudentFromClass : `${baseURL}/drop-student-from-class`,
  addStudentToClass : `${baseURL}/add-student-to-class`
 
};

export const getStudents = async () => {
    let response = await axios.get(studentRoutes.getAllStudents);
    return response.data;
  };
  export const getStudentsByGrade = async ({queryKey}) => {
    let {gradeCourseId} = queryKey[1]
    let response = await axios.get(`${studentRoutes.getStudentsByGrade}/${gradeCourseId}`);
    return response.data;
  };
  export const getCurrentSemesterStudents = async ({queryKey}) => {
    let {semesterId} = queryKey[1]
    let response = await axios.get(`${studentRoutes.getCurrentSemesterStudents}/${semesterId}`);
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
  export const dropStudentFromClass = async (scoreCardId) => {
    let response = await axios.put(`${studentRoutes.dropStudentFromClass}/${scoreCardId}`);
    return response.data;
  };
  export const addStudentToClass = async (addStudentRequest) => {
    let response = await axios.put(`${studentRoutes.addStudentToClass}`, addStudentRequest);
    return response.data;
  };
  