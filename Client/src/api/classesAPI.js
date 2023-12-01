import axiosClient from "./AxiosClient";

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
    let response = await axiosClient.get(classRoutes.getAllClasses);
    return response.data;
  };
  export const createClass = async (classModel) => {
    let response = await axiosClient.post(classRoutes.createClass, classModel);
    return response.data;
  };
  export const updateClass = async (classModel) => {
    let response = await axiosClient.put(classRoutes.updateClass, classModel);
    return response.data;
  };

  export const startClass = async (startDetails) =>{
    let response = await axiosClient.post(classRoutes.startClass, startDetails);
    return response.data;
  }

  export const endClass = async (startDetails) =>{
    let response = await axiosClient.post(classRoutes.endClass, startDetails);
    return response.data;
  }