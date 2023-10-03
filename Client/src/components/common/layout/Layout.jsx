import React, { useState } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const Layout = ({ children }) => {
  const [openState, setOpenState] = useState(true);
  
  const toggleSidebar = () => {
    setOpenState(!openState);
  };

  return (
    <div className="bg-[#F5F7FD]">
      <Navbar onToggleSidebar={toggleSidebar}/>
      <div className="flex">
      <SideMenu openState={openState} />
      <div className="p-5 w-screen">
      {children}
      </div>
    

      </div>
 
     
    </div>
  );
};

export default Layout;
