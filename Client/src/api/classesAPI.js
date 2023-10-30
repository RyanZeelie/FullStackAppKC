import axios from "axios";

// TODO : Create a default Axios Client
const baseURL = "https://localhost:7232";
const classRoutes = {
  getAllClasses: `${baseURL}/get-classes`,
  createClass: `${baseURL}/create-class`,
  updateClass: `${baseURL}/update-class`,
  startClass : `${baseURL}/start-class`,
  endClass : `${baseURL}/end-class`
};

export const getClasses = async () => {
    let response = await axios.get(classRoutes.getAllClasses);
    return response.data;
  };
  export const createClass = async (classModel) => {
    let response = await axios.post(classRoutes.createClass, classModel);
    return response.data;
  };
  export const updateClass = async (classModel) => {
    let response = await axios.put(classRoutes.updateClass, classModel);
    return response.data;
  };

  export const startClass = async (classId) =>{
    let response = await axios.post(classRoutes.startClass, {classId});
    return response.data;
  }

  export const endClass = async (classId) =>{
    let response = await axios.post(classRoutes.endClass, {classId});
    return response.data;
  }