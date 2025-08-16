import { useState } from "react";
import { useStore } from "../../store";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  FaExclamationTriangle,
  FaCalendarAlt,
  FaTasks
} from "react-icons/fa";

const STATUS_COLORS = {
  "To-Do": "#3B82F6",
  "In-Progress": "#FACC15",
  Completed: "#22C55E",
};

const TYPE_COLORS = {
  Work: "#f97316",
  School: "#8b5cf6",
  Self: "#ec4899",
};

export default function Dashboard() {
  const tasks = useStore((store) => store.tasks);
  const [filterDate, setFilterDate] = useState("");

  const filteredTasks = filterDate
    ? tasks.filter((task) => task.dueDate === filterDate)
    : tasks;

  if (filteredTasks.length === 0) {
    return (
      <div className="p-4 sm:p-6 bg-white min-h-screen sm:ml-52 flex flex-col items-center justify-center text-center text-gray-600">
        <FaTasks size={60} className="text-blue-400 mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold mb-2">No tasks yet</h2>
        <p className="max-w-md text-sm sm:text-base">
          Add tasks to see your charts, insights, and progress here on the
          dashboard.
        </p>
        <Link to="/">
          <button className="mt-4 px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 font-semibold">
            Go to Boards
          </button>
        </Link>
      </div>
    );
  }

  const todo = filteredTasks.filter((t) => t.state === "To-Do").length;
  const inProgress = filteredTasks.filter(
    (t) => t.state === "In-Progress"
  ).length;
  const completed = filteredTasks.filter((t) => t.state === "Completed").length;

  const today = new Date().toISOString().split("T")[0];
  const overdue = filteredTasks.filter(
    (t) => t.dueDate < today && t.state !== "Completed"
  );

  const upcoming = filteredTasks.filter((t) => {
    const diff =
      (new Date(t.dueDate).getTime() - new Date(today).getTime()) /
      (1000 * 60 * 60 * 24);
    return diff > 0 && diff <= 7;
  });

  const chartData = [
    { name: "To-Do", value: todo, color: STATUS_COLORS["To-Do"] },
    {
      name: "In Progress",
      value: inProgress,
      color: STATUS_COLORS["In-Progress"],
    },
    { name: "Completed", value: completed, color: STATUS_COLORS["Completed"] },
  ];

  const categoryCounts = ["Work", "School", "Self"].map((type) => ({
    name: type,
    value: filteredTasks.filter((t) => t.type === type).length,
    color: TYPE_COLORS[type as keyof typeof TYPE_COLORS],
  }));

  const past7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split("T")[0];
    return {
      date: dateStr.slice(5),
      count: filteredTasks.filter((t) => t.dueDate === dateStr).length,
    };
  });

  return (
    <div className="p-4 bg-white min-h-screen sm:ml-60 text-gray-800">
      <h2 className="sm:text-3xl text-2xl font-bold mb-6 text-gray-700 items-center justify-center flex sm:static fixed h-[5rem] z-20 top-0 w-full sm:border-none border-b-2 border-gray-300 bg-white font-poppins">
         Dashboard
      </h2>

      {/* Date Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 sm:mt-0 mt-14 mb-6">
        <label className="font-bold">Filter by Date:</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border rounded p-1 text-sm sm:text-base"
        />
        {filterDate && (
          <button
            onClick={() => setFilterDate("")}
            className="text-red-500 underline text-sm sm:text-base"
          >
            Clear
          </button>
        )}
      </div>

      {/* Alerts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {overdue.length > 0 && (
          <div className="bg-red-100 border border-red-400 p-4 rounded-lg">
            <h3 className="font-bold text-red-600 mb-2 flex items-center gap-2">
              <FaExclamationTriangle /> Overdue Tasks
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
              {overdue.map((task) => (
                <li key={task.id}>
                  <span className="font-semibold">{task.title}</span>
                  <span className="text-gray-600">
                    (Due:{" "}
                    {new Date(task.dueDate).toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                    )
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {upcoming.length > 0 && (
          <div className="bg-blue-50 border border-blue-300 p-4 rounded-lg">
            <h3 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
              <FaCalendarAlt /> Upcoming Deadlines
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
              {upcoming.map((task) => (
                <li key={task.id}>
                  <span className="font-semibold">{task.title}</span>
                  <span className="text-gray-600">
                    (Due:{" "}
                    {new Date(task.dueDate).toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                    )
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Pie Chart */}
        <div className="bg-blue-50 p-4 rounded-lg shadow flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <h3 className="font-bold mb-4 text-blue-700 flex items-center gap-2">
              <FaTasks /> Task Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9fafb",
                    border: "1px solid #d1d5db",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-center gap-2 text-sm sm:text-base">
            {chartData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-700 font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="font-bold mb-4 text-blue-700">Task Counts</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
              <XAxis dataKey="name" stroke="#334155" />
              <YAxis allowDecimals={false} stroke="#334155" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #d1d5db",
                }}
              />
              <Legend />
              <Bar dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Categories */}
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="font-bold mb-4 text-blue-700">Top Categories</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryCounts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
              <XAxis dataKey="name" stroke="#334155" />
              <YAxis allowDecimals={false} stroke="#334155" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #d1d5db",
                }}
              />
              <Bar dataKey="value">
                {categoryCounts.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Trend */}
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="font-bold mb-4 text-blue-700">
            Weekly Tasks Due Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={past7Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
              <XAxis dataKey="date" stroke="#334155" />
              <YAxis allowDecimals={false} stroke="#334155" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #d1d5db",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3B82F6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
