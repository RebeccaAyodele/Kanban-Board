import {
  DashBoardIcon,
  Logout,
  MyBoardsIcon,
  Notifications,
  Settings,
  TeamsIcon,
} from "./Icons";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaRegCalendarAlt } from "react-icons/fa"; 
import logo from "../images/Logo.jpg";

const baseItem =
  "flex items-center gap-3 h-14 w-[12rem] ml-[2rem] rounded-[1rem] text-xl transition-colors";

const inactive = "text-gray-500 hover:bg-primary-color";
const active = "bg-primary-color";

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
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex`}
      >
        {/* Logo */}
        <div className="flex justify-center items-center border-b-2 border-gray-300 w-full p-4">
          <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
          <h1 className="text-2xl font-bold">TaskFlow</h1>
        </div>

        {/* Top section */}
        <ul>
          {[
            { to: "/dashboard", label: "Dashboard", icon: <DashBoardIcon /> },
            { to: "/", label: "My Boards", icon: <MyBoardsIcon />, end: true },
            { to: "/calendar", label: "Calendar", icon: <FaRegCalendarAlt className="text-2xl ml-1" /> },
            { to: "/teams", label: "Teams", icon: <TeamsIcon /> },
          ].map(({ to, label, icon, end }) => (
            <li key={to} className="mb-4">
              <NavLink to={to} end={end}>
                {({ isActive }) => (
                  <div
                    className={`${baseItem} ${isActive ? active : inactive} group`}
                    onClick={() => setIsOpen(false)}
                  >
                    {/* Icon: gray → blue on hover/active */}
                    <span
                      className={`transition-colors ${
                        isActive ? "text-blue-500" : "text-gray-500"
                      } group-hover:text-blue-500`}
                    >
                      {icon}
                    </span>

                    {/* Label: gray → black on hover/active */}
                    <span
                      className={`transition-colors ${
                        isActive ? "text-black" : "text-gray-500"
                      } group-hover:text-black`}
                    >
                      {label}
                    </span>
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Bottom section */}
        <ul className="border-t-2 w-[15rem]">
          {[
            { to: "/settings", label: "Settings", icon: <Settings /> },
            { to: "/notifications", label: "Notifications", icon: <Notifications /> },
            { to: "/logout", label: "Logout", icon: <Logout /> },
          ].map(({ to, label, icon }) => (
            <li key={to} className="mb-4 mt-2">
              <NavLink to={to}>
                {({ isActive }) => (
                  <div
                    className={`ml-[2.5rem] ${baseItem.replace("ml-[2rem]", "")} ${
                      isActive ? active : inactive
                    } group`}
                    onClick={() => setIsOpen(false)}
                  >
                    {/* Icon: gray → blue */}
                    <span
                      className={`transition-colors ${
                        isActive ? "text-blue-500" : "text-gray-500"
                      } group-hover:text-blue-500`}
                    >
                      {icon}
                    </span>

                    {/* Label: gray → black */}
                    <span
                      className={`transition-colors ${
                        isActive ? "text-black" : "text-gray-500"
                      } group-hover:text-black`}
                    >
                      {label}
                    </span>
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
