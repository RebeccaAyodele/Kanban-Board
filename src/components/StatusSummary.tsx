import { useStore } from "../store";
import { useNavigate, useLocation } from "react-router-dom";

const StatusSummary = () => {
  const tasks = useStore((state) => state.tasks);
  const navigate = useNavigate();
  const location = useLocation();

  const todoCount = tasks.filter((t) => t.state === "To-Do").length;
  const inProgressCount = tasks.filter((t) => t.state === "In-Progress").length;
  const completedCount = tasks.filter((t) => t.state === "Completed").length;

  const statuses = [
    { label: "To-Do", path: "/todo", count: todoCount, color: "bg-blue-700", activeColor: "bg-blue-400" },
    { label: "In-Progress", path: "/in-progress", count: inProgressCount, color: "bg-yellow-500", activeColor: "bg-yellow-300" },
    { label: "Completed", path: "/completed", count: completedCount, color: "bg-green-600", activeColor: "bg-green-300" },
  ];

  return (
    <div className="flex justify-around mt-16 gap-4">
      {statuses.map(({ label, path, count, color, activeColor }) => {
        const isActive = location.pathname === path;

        return (
          <div
            key={label}
            onClick={() => navigate(path)}
            className={`relative cursor-pointer px-4 py-1 rounded font-poppins text-gray-800 text-[14px] 
                        flex items-center justify-center whitespace-nowrap
                        ${isActive ? activeColor : "bg-gray-200"} text-black`}
          >
            {label}

            {/* Status Circle */}
            <span
              className={`absolute top-2 right-2 translate-x-1/2 -translate-y-1/2 
                          flex items-center justify-center rounded-full text-white text-xs
                          ${color} ${isActive ? "w-5 h-5" : "w-2 h-2"}`}
            >
              {isActive ? count : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StatusSummary;