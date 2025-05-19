import { SearchIcon, AddListIcon } from "./Icons";
import logo from "../images/Logo.jpg";
import profile from "../images/profile.jpg"

const Header = () => {
  return (
    <div className="flex fixed w-full justify-between border-b-2 border-gray-300 px-4 pb-4 font-poppins">
      <div className="flex justify-center items-center">
        <img src={logo} alt="Logo" />
        <h1 className="text-2xl font-bold">TaskFlow</h1>
      </div>
      <div className="flex">
        <form className="w-full relative">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search Tasks"
            className="bg-blue-50 rounded-xl w-[37vw] h-[56px] placeholder:pl-24 placeholder:text-xl"
          />
        </form>
        <AddListIcon />
      </div>
      <div className="flex justify-center items-center mx-20 gap-4">
        <img src={profile} alt="Profile picture" />
        <h2 className="text-[18px]">Rebecca Ayodele</h2>
      </div>
    </div>
  );
};

export default Header;