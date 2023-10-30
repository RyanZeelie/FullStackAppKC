import axios from "axios";

// TODO : Create a default Axios Client
const baseURL = "https://localhost:7232";
const mangementRoutes = {
  getManagementViewData: `${baseURL}/get-dashboard`,
  getClassOverview : `${baseURL}/get-class-overview`
};

export const getDashboarData = async () => {
    let response = await axios.get(mangementRoutes.getManagementViewData);
    return response.data;
  };


  export const getClassOverview = async ({queryKey}) => {
    let {gradeId} = queryKey[1]
    let response = await axios.get(`${mangementRoutes.getClassOverview}/${gradeId}`);
    return response.data;
  };
