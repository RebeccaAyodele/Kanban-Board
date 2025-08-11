import { SearchIcon, AddListIcon } from "./Icons";
import profile from "../images/profile.jpg"
import { useStore } from "../store";

const Header = () => {
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const searchQuery = useStore((state) => state.searchQuery);

  const handleSubmit = (e: any) => {
    e.preventDefault();}
  return (
    <div className="flex fixed z-50 top-0 w-full items-end mx-auto sm:justify-between justify-end border-b-2 border-gray-300 bg-white px-4 py-4 font-poppins">
      <hr></hr>
     
      <div className="flex sm:w-[70%]">
      <div className="flex">
        <form onSubmit={handleSubmit} className="w-full sm:flex relative hidden">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search Tasks"
            className="bg-blue-50 rounded-xl focus:outline-blue-200 w-[37vw] h-[56px] placeholder:pl-24 px-8 placeholder:text-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <AddListIcon />
      </div>
      <div className="flex justify-center items-center sm:mx-20 gap-4">
        <img className="sm:w-14 w-10 sm:ml-0 ml-4" src={profile} alt="Profile picture" />
        <h2 className="sm:flex text-[18px] hidden">Rebecca Ayodele</h2>
      </div>
      </div>
    </div>
  );
};

export default Header;