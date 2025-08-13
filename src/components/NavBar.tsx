import { DashBoardIcon, Logout, MyBoardsIcon, Notifications, ReportsIcon, Settings, TeamsIcon } from "./Icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/Logo.jpg";

const baseItem =
  "flex items-center gap-3 h-14 w-[13.5rem] ml-[2rem] rounded-[1rem] text-xl transition-colors";

const inactive = "text-gray-500 hover:bg-primary-color hover:text-black";
const active = "bg-primary-color text-black";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex fixed top-0 left-0 md:w-[15rem] z-50">
      <button
        className="md:hidden p-4 z-50 absolute"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
        </div>
      </button>

      <div
        className={`fixed top-0 left-0 pt-4 h-screen w-[15rem] bg-white border-r-2 border-gray-300 flex flex-col justify-between items-center transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex`}
      >
        {/* Logo */}
        <div className="flex justify-center items-center">
          <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
          <h1 className="text-2xl font-bold">TaskFlow</h1>
        </div>

        {/* Top section */}
        <ul>
          <li className="mb-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${baseItem} ${isActive ? active : inactive}`
              }
            >
              <DashBoardIcon />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li className="mb-4">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${baseItem} ${isActive ? active : inactive}`
              }
            >
              <MyBoardsIcon />
              <span>My Boards</span>
            </NavLink>
          </li>

          <li className="mb-4">
            <NavLink
              to="/teams"
              className={({ isActive }) =>
                `${baseItem} ${isActive ? active : inactive}`
              }
            >
              <TeamsIcon />
              <span>Teams</span>
            </NavLink>
          </li>

          <li className="mb-4">
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `${baseItem} ${isActive ? active : inactive}`
              }
            >
              <ReportsIcon />
              <span>Reports</span>
            </NavLink>
          </li>
        </ul>

        {/* Bottom section */}
        <ul className="border-t-2 w-[15rem]">
          <li className="mb-4 mt-2">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `ml-[2.5rem] ${baseItem.replace("ml-[2rem]", "")} ${isActive ? active : inactive}`
              }
            >
              <Settings />
              <span>Settings</span>
            </NavLink>
          </li>

          <li className="mb-4">
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `ml-[2.5rem] ${baseItem.replace("ml-[2rem]", "")} ${isActive ? active : inactive}`
              }
            >
              <Notifications />
              <span>Notifications</span>
            </NavLink>
          </li>

          <li className="mb-4">
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                `ml-[2.5rem] ${baseItem.replace("ml-[2rem]", "")} ${isActive ? active : inactive}`
              }
            >
              <Logout />
              <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
