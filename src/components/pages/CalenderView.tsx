import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { parse, startOfWeek, getDay, format } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useStore } from "../../store";
import enUS from "date-fns/locale/en-US";
import { useState, useMemo } from "react";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

type CalendarViewType = "month" | "week" | "work_week" | "day" | "agenda";

const CalendarView = () => {
  const tasks = useStore((store) => store.tasks);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<CalendarViewType>("month");

  const events = useMemo(
    () =>
      tasks.map((task) => {
        const due = new Date(task.dueDate);
        return {
          title: task.title,
          content: task.content,
          start: due,
          end: due,
          allDay: false,
        };
      }),
    [tasks]
  );

  return (
    <div className="p-4 h-[80vh] sm:ml-64">
      <h2 className="text-2xl font-semibold mb-4">📅 Task Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        view={view}
        onView={(v: any) => setView(v as CalendarViewType)} // ✅ cast to union type
        defaultView={Views.MONTH}
        date={date}
        onNavigate={(newDate: Date) => setDate(newDate)}
      />
    </div>
  );
};

export default CalendarView;
