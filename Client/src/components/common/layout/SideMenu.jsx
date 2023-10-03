import React from "react";

const SideMenu = ({ openState = true, setOpenState }) => {
  return (
    <div
      className={`bg-[#FFFFFF] h-screen w-64 transition-all duration-300 ease-in-out ${
        openState ? "translate-x-0 opacity-100" : "-translate-x-64 opacity-0"
      }`}
    >
      <ul className="p-4">
        <li className="mb-2">
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            Dashboard
          </a>
        </li>
        <li className="mb-2">
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Projects
          </a>
        </li>
        {/* Add more menu items here */}
      </ul>
    </div>
  );
};

export default SideMenu;
