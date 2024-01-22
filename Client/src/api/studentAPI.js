import axiosClient from "./AxiosClient";

const studentRoutes = {
  getAllStudents: `/get-students`,
  createStudent: `/create-student`,
  updateStudent: `/update-student`,
  getStudentsByGrade: `/get-unassigned-students-by-grade`,
  getCurrentSemesterStudents: `/get-students-for-current-semester`,
  dropStudentFromClass: `/drop-student-from-class`,
  addStudentsToClass: `/add-students-to-class`,
  updateScoreCard : "/update-score-card"
};

export const getStudents = async () => {
  let response = await axiosClient.get(studentRoutes.getAllStudents);
  return response.data;
};
export const getStudentsByGrade = async ({ queryKey }) => {
  let { gradeCourseId } = queryKey[1];
  let response = await axiosClient.get(
    `${studentRoutes.getStudentsByGrade}/${gradeCourseId}`
  );
  return response.data;
};
export const getCurrentSemesterStudents = async ({ queryKey }) => {
  let { semesterId } = queryKey[1];
  let response = await axiosClient.get(
    `${studentRoutes.getCurrentSemesterStudents}/${semesterId}`
  );
  return response.data;
};
export const createStudent = async (student) => {
  let response = await axiosClient.post(studentRoutes.createStudent, student);
  return response.data;
};
export const updateStudent = async (classModel) => {
  let response = await axiosClient.put(studentRoutes.updateStudent, classModel);
  return response.data;
};
export const dropStudentFromClass = async (scoreCardId) => {
  let response = await axiosClient.put(
    `${studentRoutes.dropStudentFromClass}/${scoreCardId}`
  );
  return response.data;
};
export const addStudentsToClass = async (addStudentRequest) => {
  let response = await axiosClient.post(
    `${studentRoutes.addStudentsToClass}`,
    addStudentRequest
  );
  return response.data;
};
export const updateScoreCard = async (scores) => {
  let response = await axiosClient.put(
    `${studentRoutes.updateScoreCard}`,
    scores
  );
  return response.data;
};
