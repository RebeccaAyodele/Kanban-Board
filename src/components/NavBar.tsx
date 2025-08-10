import { DashBoardIcon, Logout, MyBoardsIcon, Notifications, ReportsIcon, Settings, TeamsIcon } from "./Icons";
import { useState } from "react";
import logo from "../images/Logo.jpg";


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
<<<<<<< Updated upstream
      <div className= "hidden md:fixed md:top-0 md:pt-[8rem] md:h-screen md:w-[15rem] md:border-r-2 md:border-gray-300 md:flex flex-col md:justify-between md:items-center">
=======
      <button
        className="md:hidden p-4 z-50 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
        </div>
      </button>

      {/* Nav menu */}
      <div
        className={`fixed top-0 left-0 pt-4 h-screen w-[15rem] bg-white border-r-2 border-gray-300 flex flex-col justify-between items-center transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex`}
      >
        <div className="flex justify-center items-center">
          <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
          <h1 className="text-2xl font-bold">TaskFlow</h1>
        </div>

>>>>>>> Stashed changes
        <ul>
          <div className="w-[13.5rem] hover:bg-primary-color hover:rounded-[1rem]">
            <li className="mb-4 flex ml-[2rem] gap-3 items-center h-14">
              <DashBoardIcon />
              <a href="#" className="text-gray-500 text-xl hover:text-black">
                Dashboard
              </a>
            </li>
          </div>
          <div className="w-[13.5rem] hover:bg-primary-color hover:rounded-[1rem]">
            <li className="mb-4 flex ml-[2rem] gap-3 items-center h-14">
              <MyBoardsIcon />
              <a
                href="#"
                className="text-gray-500 text-xl hover:bg-primary-color hover:text-black hover:rounded"
              >
                My Boards
              </a>
            </li>
          </div>
          <div className="w-[13.5rem] hover:bg-primary-color hover:rounded-[1rem]">
            <li className="mb-4 flex ml-[2rem] gap-3 items-center h-14">
              <TeamsIcon />
              <a
                href="#"
                className="text-gray-500 text-xl hover:bg-primary-color hover:text-black hover:rounded"
              >
                Teams
              </a>
            </li>
          </div>
          <div className="w-[13.5rem] hover:bg-primary-color hover:rounded-[1rem]">
            <li className="mb-4 flex ml-[2rem] gap-3 items-center h-14">
              <ReportsIcon />
              <a
                href="#"
                className="text-gray-500 text-xl hover:bg-primary-color hover:text-black hover:rounded"
              >
                Reports
              </a>
            </li>
          </div>
        </ul>

        {/* Lower part */}
        <ul className="border-t-2 w-[15rem]">
          <div className="w-[13.5rem] hover:bg-primary-color hover:rounded-[1rem] mt-2">
            <li className="mb-4 flex ml-[2.5rem] gap-3 items-center h-14">
              <Settings />
              <a href="#" className="text-gray-500 text-xl hover:text-black">
                Settings
              </a>
            </li>
          </div>
          <div className="w-[13.5rem] hover:bg-primary-color hover:rounded-[1rem]">
            <li className="mb-4 flex ml-[2.5rem] gap-3 items-center h-14">
              <Notifications />
              <a
                href="#"
                className="text-gray-500 text-xl hover:bg-primary-color hover:text-black hover:rounded"
              >
                Notifications
              </a>
            </li>
          </div>
          <div className="w-[13.5rem] hover:bg-primary-color hover:rounded-[1rem]">
            <li className="mb-4 flex ml-[2.5rem] gap-3 items-center h-14">
              <Logout />
              <a
                href="#"
                className="text-gray-500 text-xl hover:bg-primary-color hover:text-black hover:rounded"
              >
                LogOut
              </a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
