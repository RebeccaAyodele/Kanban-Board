import { useStore } from "../store";
import { useNavigate, useLocation } from "react-router-dom";

const StatusSummary = () => {
  const tasks = useStore((state) => state.tasks);
  const navigate = useNavigate();
  const location = useLocation();

  const todoCount = tasks.filter((t) => t.state === "To-Do").length;
  const inProgressCount = tasks.filter((t) => t.state === "In-Progress").length;
  const completedCount = tasks.filter((t) => t.state === "Completed").length;

  const buttonClasses = (isActive: boolean, color: string) =>
    `cursor-pointer px-3 py-1 rounded-lg font-semibold transition-colors ${
      isActive ? `${color} text-white` : `${color.replace("bg", "text")}`
    }`;

  return (
    <div className="flex justify-around bg-white shadow p-3 sticky top-0 z-20">
      <span
        onClick={() => navigate("/todo")}
        className={buttonClasses(location.pathname === "/todo", "bg-blue-500")}
      >
        To-Do: {todoCount}
      </span>
      <span
        onClick={() => navigate("/in-progress")}
        className={buttonClasses(location.pathname === "/in-progress", "bg-yellow-500")}
      >
        In-Progress: {inProgressCount}
      </span>
      <span
        onClick={() => navigate("/completed")}
        className={buttonClasses(location.pathname === "/completed", "bg-green-500")}
      >
        Completed: {completedCount}
      </span>
    </div>
  );
};

export default StatusSummary;
