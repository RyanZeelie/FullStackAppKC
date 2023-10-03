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
      {children}
      <SideMenu openState={openState} />
    </div>
  );
};

export default Layout;
