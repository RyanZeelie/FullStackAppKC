import React,{useState} from "react";
import { v4 as uuidv4 } from "uuid";
import {Menu,AdminMenu} from "../../../constants/Menu";
import CancelButton from "../buttons/CancelButton";
import { Link } from "react-router-dom";
import useAuthStore from "../../../stores/AuthStore";
const SideMenu = ({ openDrawer = true }) => {
  const {logout} = useAuthStore(state=>state)
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };


  const containerStyle = `bg-[#FFFFFF] text-grey w-64 overflow-x-hidden overflow-y-hidden transition-width duration-300 ease-in-out  ${
    openDrawer ? "w-[200px]" : "w-[0px]"
  }`;
  const userInfoStyles = {
    userInfoContainer: `bg-[#FFFFFF] p-4 text-black shrink-0 h-17 flex justify-between`,
  };

  return (
    <div className={containerStyle}>
      <div className={userInfoStyles.userInfoContainer}>
        <CancelButton label="Logout" action={logout} /> 
      </div>
      <hr />
      <div className="flex items-center justify-between p-2">
        <p className="p-2">Admin</p>
        <button
          onClick={toggleCollapse}
          className="flex items-center focus:outline-none transition-transform duration-300"
        >
          <span className={`transform ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}>
            &gt;
          </span>
        </button>
      </div>
      <div className={`${isCollapsed ? 'max-h-0' : 'max-h-full'} overflow-hidden transition-max-height duration-500`}>
        <ul className="p-5">
          {AdminMenu.map((menuItem) => (
            <Link to={menuItem.route} key={uuidv4()} className="mb-5 flex">
              {<menuItem.icon />}
              <span className="ml-2"> {menuItem.label}</span>
            </Link>
          ))}
        </ul>
      </div>
      <hr />
      <ul className="p-5">
        {Menu.map((menuItem) => (
          <Link to={menuItem.route} key={uuidv4()} className="mb-5 flex">
            {<menuItem.icon />}
            <span className="ml-2"> {menuItem.label}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
