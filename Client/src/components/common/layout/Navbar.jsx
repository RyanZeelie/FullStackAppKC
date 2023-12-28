import useAuthStore from "../../../stores/AuthStore";
import { HamburgerClosed, HamburgerOpen } from "../icons/Icons";

const Navbar = ({ toggleMenu, openDrawer }) => {
  const { user } = useAuthStore((state) => state);
  const userName = () => {
    if (user) {
      let [name, surname] = user.firstName.split(":");
      return `${name[0]}${surname[0]}`;
    }
  };

  return (
    <div className="flex justify-between items-center mb-4 p-4 bg-[#FFFFFF]">
      <button
        className="text-gray-600 hover:text-gray-800"
        onClick={toggleMenu}
      >
        {openDrawer ? HamburgerClosed() : HamburgerOpen()}
      </button>
      <h1 className="text-2xl font-semibold">Class Management</h1>
      <div className="rounded-full bg-gray-800 text-white px-3 py-2">
        {userName()}
      </div>
    </div>
  );
};

export default Navbar;
