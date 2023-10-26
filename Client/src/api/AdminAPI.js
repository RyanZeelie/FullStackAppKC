import axios from "axios";

// TODO : Create a default Axios Client
const baseURL = "https://localhost:7232";
const getRoutes = {
  getAllGrades: `${baseURL}/get-grades`,
  getAllCourses: `${baseURL}/get-courses`,
  getAllLevels: `${baseURL}/get-levels`,
  getAllGradesCourses: `${baseURL}/get-grade-course`,
};
const createRoutes = {
  createGrade: `${baseURL}/create-grade`,
  createCourse: `${baseURL}/create-course`,
  createLevel: `${baseURL}/create-level`,
  createGradeCourse: `${baseURL}/create-grade-course`,
};
const udpateRoutes = {
  updateGrade: `${baseURL}/update-grade`,
  updateCourse: `${baseURL}/update-course`,
  updateLevel: `${baseURL}/update-level`,
  updateGradeCourse: `${baseURL}/update-grade-course`,
};

export const getGrades = async () => {
  let response = await axios.get(getRoutes.getAllGrades);
  return response.data;
};
export const getCourses = async () => {
  let response = await axios.get(getRoutes.getAllCourses);
  return response.data;
};
export const getLevels = async () => {
  let response = await axios.get(getRoutes.getAllLevels);
  return response.data;
};
export const getGradesCourses = async () => {
  let response = await axios.get(getRoutes.getAllGradesCourses);
  return response.data;
};

export const createGrade = async (grade) => {
  let response = await axios.post(createRoutes.createGrade, grade);
  return response.data;
};
export const createCourse = async (course) => {
  let response = await axios.post(createRoutes.createCourse, course);
  return response.data;
};
export const createLevel = async (level) => {
  let response = await axios.post(createRoutes.createLevel, level);
  return response.data;
};
export const createGradeCourse = async (gradeCourse) => {
  let response = await axios.post(createRoutes.createGradeCourse, gradeCourse);
  return response.data;
};

export const updateGrade = async (grade) => {
    let response = await axios.put(udpateRoutes.updateGrade,grade);
    return response.data;
  };
  export const updateCourse = async (course) => {
    let response = await axios.put(udpateRoutes.updateCourse, course);
    return response.data;
  };
  export const updateLevel = async (level) => {
    let response = await axios.put(udpateRoutes.updateLevel, level);
    return response.data;
  };
  export const updateGradeCourse = async (gradeCourse) => {
    let response = await axios.put(udpateRoutes.updateGradeCourse, gradeCourse);
    return response.data;
  };
