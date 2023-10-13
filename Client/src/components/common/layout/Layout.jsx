import React, { useState } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
const Layout = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const toggleMenu = () => {
    setOpenDrawer(!openDrawer);
  };
  return (
    <div className="flex h-screen bg-[#F5F7FD]">
      <SideMenu openDrawer={openDrawer} />
      <main className="flex-1">
        <Navbar toggleMenu={toggleMenu} openDrawer={openDrawer} />
        <div className="p-4"> {children}</div>
      </main>
    </div>
  );
};

export default Layout;
