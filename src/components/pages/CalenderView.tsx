import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { parse, startOfWeek, getDay, format } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useStore } from "../../store";
import { enUS } from "date-fns/locale";
import { useState, useMemo, useEffect } from "react";

interface MobileToolbarProps {
  label: string;
  onNavigate: (action: string) => void;
  onView: (view: string) => void;
}

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

type CalendarViewType = "month" | "week" | "work_week" | "day" | "agenda";

const MobileToolbar = ({ label, onNavigate, onView }: MobileToolbarProps) => (
  <div className="flex flex-wrap justify-between items-center mb-10 gap-1 sm:hidden">
    <div className="flex gap-1">
      <button className="px-2 py-1 bg-gray-200 rounded text-xs" onClick={() => onNavigate("PREV")}>◀</button>
      <button className="px-2 py-1 bg-gray-200 rounded text-xs" onClick={() => onNavigate("TODAY")}>Today</button>
      <button className="px-2 py-1 bg-gray-200 rounded text-xs" onClick={() => onNavigate("NEXT")}>▶</button>
    </div>

    <span className="text-xs font-semibold">{label}</span>

    <div className="flex gap-1">
      {["month", "week", "day", "agenda"].map((v) => (
        <button
          key={v}
          className="px-2 py-1 bg-gray-200 rounded text-xs"
          onClick={() => onView(v)}
        >
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </button>
      ))}
    </div>
  </div>
);

const CalendarView = () => {
  const tasks = useStore((store) => store.tasks);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<CalendarViewType>("month");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 800); 
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const events = useMemo(
    () =>
      tasks.map((task) => {
        const due = new Date(task.dueDate);
        return { title: task.title, content: task.content, start: due, end: due, allDay: false };
      }),
    [tasks]
  );

  return (
    <div className="p-2 sm:p-4 max-w-screen max-w-full sm:ml-64">
      <h2 className="sm:text-2xl sm:mb-4 text-center sm:text-left text-xl ml-[2rem] mb-6 font-bold">
        Task Calendar
      </h2>

      <div className="overflow-auto w-full">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ minHeight: "70vh", width: "100%" }}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          view={view}
          onView={(v: any) => setView(v as CalendarViewType)}
          defaultView={Views.MONTH}
          date={date}
          onNavigate={(newDate: Date) => setDate(newDate)}
          popup
          components={isMobile ? { toolbar: MobileToolbar } : {}}
        />
      </div>
    </div>
  );
};

export default CalendarView;
