import create from "zustand";
import axiosClient from "../api/AxiosClient";
import { toast } from "react-toastify";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  logout: async () => {
    try {
      await axiosClient.post("/logout");
      set({ isAuthenticated: false, user: null });
    } catch (err) {
      toast.error("Error logging out");
    }
    finally{
      window.location = '/login'
    }
  },
  checkAuth: async () => {
    try {
      let response = await axiosClient.get("/auth-check");
      set({ isAuthenticated: true, user : response.data });
    } catch (err) {
      toast.error("Authentication Failed. Please Login");
      set({ isAuthenticated: false });
      window.location = '/login'
    }
  },
  setAuthenticated:(authState, user)=>{
    set({ isAuthenticated: authState, user: user });
  }
}));

export default useAuthStore;
