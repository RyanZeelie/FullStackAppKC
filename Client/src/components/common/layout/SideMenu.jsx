import React from "react";
import Menu from "../../../constants/Menu";
const SideMenu = ({ openState = true }) => {
  return (
    <div
      className={`bg-[#FFFFFF] h-screen w-64 transition-all duration-300 ease-in-out ${
        openState ? "translate-x-0 opacity-100" : "-translate-x-64 opacity-0"
      }`}
    >
      <ul className="p-4">
        {Menu.map((menuItem) => {
          return (
            <li className="mb-5 flex">
              {<menuItem.icon />}
              <span className="ml-2"> {menuItem.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideMenu;
