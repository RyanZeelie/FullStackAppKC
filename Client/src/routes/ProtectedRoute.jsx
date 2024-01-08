import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/AuthStore";
import { Outlet } from "react-router-dom";
import Layout from "../components/common/layout/Layout";
import NotificationDialogue from "../components/common/modals/NotificationDialogue";
export const ProtectedRoute = ({allowedRoles}) => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, checkAuth, user } = useAuthStore(
    (state) => state
  );
  useEffect(() => {
   console.log(pathname) 
    checkAuth();
  }, []);
 
  const isAuthorized = () =>{
    return user?.roles.some(role => allowedRoles.includes(role))
  }

  return (
    <>
      {!isAuthenticated ? (
        <NotificationDialogue message={"Checking Authentication"} />
      ) :
      !isAuthorized() ?  <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center">
          <h1 className="text-5xl font-bold text-red-600">Unauthorized Access</h1>
          <p className="text-lg mt-4">Sorry, you do not have permission to view this page.</p>
          <button 
              onClick={()=>navigate("/")} 
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none transition duration-300"
          >
              Return to Dashboard
          </button>
      </div>
  </div> :
      (
        <Layout>
          <Outlet />
        </Layout>
      )}
    </>
  );
};
