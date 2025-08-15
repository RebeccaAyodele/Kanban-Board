import { DashBoardIcon, Logout, MyBoardsIcon, Notifications, ReportsIcon, Settings, TeamsIcon } from "./Icons";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // React Icons
import logo from "../images/Logo.jpg";

const baseItem =
  "flex items-center gap-3 h-14 w-[12rem] ml-[2rem] rounded-[1rem] text-xl transition-colors";

const inactive = "text-gray-500 hover:bg-primary-color hover:text-black";
const active = "bg-primary-color text-black";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="flex fixed top-0 left-0 md:w-[15rem] z-50">
      {/* Hamburger Button */}
      <button
        className="md:hidden p-4 z-60 fixed top-4 left-4 text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 pt-4 h-screen w-[15rem] bg-white border-r-2 border-gray-300 flex flex-col justify-between items-center transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex`}
      >
        {/* Logo */}
        <div className="flex justify-center items-center border-b-2 border-gray-300 w-full p-4">
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
              onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
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
