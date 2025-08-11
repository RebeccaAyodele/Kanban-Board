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
    `cursor-pointer px-3 py-1 rounded-md font-semibold transition-colors ${
      isActive ? `${color} text-white` : `${color.replace("bg", "text")}`
    }`;

  return (
    <div className="flex justify-around mt-16">
      <span
        onClick={() => navigate("/todo")}
        className={buttonClasses(location.pathname === "/todo", "bg-blue-400 text-black/70")}
      >
        To-Do: {todoCount}
      </span>
      <span
        onClick={() => navigate("/in-progress")}
        className={buttonClasses(location.pathname === "/in-progress", "bg-yellow-300 text-black/70")}
      >
        In-Progress: {inProgressCount}
      </span>
      <span
        onClick={() => navigate("/completed")}
        className={buttonClasses(location.pathname === "/completed", "bg-green-300 text-black/70")}
      >
        Completed: {completedCount}
      </span>
    </div>
  );
};

export default StatusSummary;
