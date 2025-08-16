import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="p-4 sm:p-6 bg-white min-h-screen sm:ml-52 flex flex-col items-center justify-center text-center text-gray-600">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Future Improvement</h2>
      <p className="max-w-md text-sm sm:text-base">
        This section highlights functionality that will be added once backend
        support is implemented. Until then, you can continue exploring the main
        page.
      </p>
      <Link to="/">
        <button className="mt-4 px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 font-semibold">
          Go to Boards
        </button>
      </Link>
    </div>
  );
};

export default Settings;
