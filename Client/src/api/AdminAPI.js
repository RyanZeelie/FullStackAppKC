import axiosClient from "./AxiosClient";


const getRoutes = {
  getAllGrades: `/get-grades`,
  getAllCourses: `/get-courses`,
  getAllLevels: `/get-levels`,
  getAllGradesCourses: `/get-grade-course`,
};
const createRoutes = {
  createGrade: `/create-grade`,
  createCourse: `/create-course`,
  createLevel: `/create-level`,
  createGradeCourse: `/create-grade-course`,
};
const udpateRoutes = {
  updateGrade: `/update-grade`,
  updateCourse: `/update-course`,
  updateLevel: `/update-level`,
  updateGradeCourse: `/update-grade-course`,
};

export const getGrades = async () => {
  let response = await axiosClient.get(getRoutes.getAllGrades);
  return response.data;
};
export const getCourses = async () => {
  let response = await axiosClient.get(getRoutes.getAllCourses);
  return response.data;
};
export const getLevels = async () => {
  let response = await axiosClient.get(getRoutes.getAllLevels);
  return response.data;
};
export const getGradesCourses = async () => {
  let response = await axiosClient.get(getRoutes.getAllGradesCourses);
  return response.data;
};

export const createGrade = async (grade) => {
  let response = await axiosClient.post(createRoutes.createGrade, grade);
  return response.data;
};
export const createCourse = async (course) => {
  let response = await axiosClient.post(createRoutes.createCourse, course);
  return response.data;
};
export const createLevel = async (level) => {
  let response = await axiosClient.post(createRoutes.createLevel, level);
  return response.data;
};
export const createGradeCourse = async (gradeCourse) => {
  let response = await axiosClient.post(createRoutes.createGradeCourse, gradeCourse);
  return response.data;
};

export const updateGrade = async (grade) => {
    let response = await axiosClient.put(udpateRoutes.updateGrade,grade);
    return response.data;
  };
  export const updateCourse = async (course) => {
    let response = await axiosClient.put(udpateRoutes.updateCourse, course);
    return response.data;
  };
  export const updateLevel = async (level) => {
    let response = await axiosClient.put(udpateRoutes.updateLevel, level);
    return response.data;
  };
  export const updateGradeCourse = async (gradeCourse) => {
    let response = await axiosClient.put(udpateRoutes.updateGradeCourse, gradeCourse);
    return response.data;
  };
