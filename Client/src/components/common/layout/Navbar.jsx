const Navbar = ({ onToggleSidebar }) => {
  return (
    <div className={"bg-[#FFFFFF] p-4 w-full drop-shadow-sm"}>
      <div className="flex items-center">
        <div className="cursor: pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 cursor: pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={onToggleSidebar}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <h1 className="text-black text-2xl font-semibold ml-2">My App</h1>
      </div>
    </div>
  );
};

export default Navbar;