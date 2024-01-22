import axios from "axios";

const baseURL = "https://localhost:7232/api";

const axiosClient = axios.create({
  baseURL: baseURL,
});

axiosClient.defaults.withCredentials = true;

export default axiosClient;
