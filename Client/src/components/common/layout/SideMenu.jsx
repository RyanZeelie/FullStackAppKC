import React from "react";
import { v4 as uuidv4 } from "uuid";
import Menu from "../../../constants/Menu";
import CancelButton from "../buttons/CancelButton";
import { Link } from "react-router-dom";
const SideMenu = ({ openDrawer = true }) => {
  const containerStyle = `bg-[#FFFFFF] text-grey w-64 overflow-x-hidden overflow-y-hidden transition-width duration-300 ease-in-out  ${
    openDrawer ? "w-[200px]" : "w-[0px]"
  }`;
  const userInfoStyles = {
    userInfoContainer: `bg-[#FFFFFF] p-4 text-black shrink-0 h-17 flex justify-between`,
  };

  return (
    <div className={containerStyle}>
      <div className={userInfoStyles.userInfoContainer}>
        <CancelButton label="Logout" /> 
      </div>
      <ul className="p-5">
        {Menu.map((menuItem) => {
          return (
            <Link to={menuItem.route} key={uuidv4()} className="mb-5 flex">
              {<menuItem.icon />}
              <span className="ml-2"> {menuItem.label}</span>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SideMenu;
