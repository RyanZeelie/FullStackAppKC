import create from "zustand";
import axiosClient from "../api/AxiosClient";
import { toast } from "react-toastify";
const useAuthStore = create((set) => ({
  isAuthenticated: false,
  authCheckLoading: false,
  user: null,
  logout: async () => {
    try {
      await axiosClient.post("/logout");
      set({ isAuthenticated: false, user: null });
    } catch (err) {
      toast.error("Error logging out");
    }
  },
  checkAuth: async () => {
    try {
      set({ authCheckLoading: true });
      await axiosClient.get("/auth-check");
      set({ isAuthenticated: true });
      set({ authCheckLoading: false });
    } catch (err) {
      toast.error("Authentication Failed. Please Login");
      set({ isAuthenticated: false });
      set({ authCheckLoading: false });
    }
  },
  setAuthenticated: (val) => {
    set({ isAuthenticated: val });
  },
}));

export default useAuthStore;
