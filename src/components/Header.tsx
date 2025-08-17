import { SearchIcon, AddListIcon } from "./Icons";
import profile from "../images/profile.jpg"
import { useStore } from "../store";

type HeaderProps = {
  onAddClick: () => void;
};

const Header = ({ onAddClick }: HeaderProps) => {
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const searchQuery = useStore((state) => state.searchQuery);

  const handleSubmit = (e: any) => {
    e.preventDefault();}
  return (
    <div className="flex fixed z-20 top-0 w-full items-end mx-auto sm:justify-between justify-end border-b-2 border-gray-300 bg-white p-4 font-poppins">
      <hr></hr>
     
      <div className="flex sm:w-[70%] h-full">
      <div className="flex">
        <form onSubmit={handleSubmit} className="w-full sm:flex relative">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search Tasks"
            className="bg-blue-50 rounded-xl sm:mt-0 mt-2 focus:outline-blue-200 w-[37vw] sm:h-[56px] h-[45px] mr-4 sm:placeholder:pl-24 px-8 sm:placeholder:text-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <button onClick={onAddClick} className="cursor-pointer"><AddListIcon /></button>
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