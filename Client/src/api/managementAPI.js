import axiosClient from "./AxiosClient";


const mangementRoutes = {
  getManagementViewData: `/get-dashboard`,
  getClassOverview : `/get-class-overview`
};

export const getDashboarData = async () => {
    let response = await axiosClient.get(mangementRoutes.getManagementViewData);
    return response.data;
  };


  export const getClassOverview = async ({queryKey}) => {
    let {gradeId} = queryKey[1]
    let response = await axiosClient.get(`${mangementRoutes.getClassOverview}/${gradeId}`);
    return response.data;
  };
