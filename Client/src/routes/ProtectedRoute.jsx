import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/AuthStore";
import { Outlet } from "react-router-dom";
import Layout from "../components/common/layout/Layout";
import NotificationDialogue from "../components/common/modals/NotificationDialogue";
export const ProtectedRoute = ({allowedRoles}) => {
  const {pathname} = useLocation()
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
      !isAuthorized() ? <div>Unauthorized Access</div> :
      (
        <Layout>
          <Outlet />
        </Layout>
      )}
    </>
  );
};
