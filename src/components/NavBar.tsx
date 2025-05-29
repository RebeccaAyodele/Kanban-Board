import { DashBoardIcon, Logout, MyBoardsIcon, Notifications, ReportsIcon, Settings, TeamsIcon } from "./Icons";


const NavBar = () => {
  return (
    <div className="flex">
      <div className= "hidden md:fixed md:top-0 md:pt-[8rem] md:h-screen md:w-[15rem] md:border-r-2 md:border-gray-300 md:flex flex-col md:justify-between md:items-center">
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

        {/* NavBar Lower part */}
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
