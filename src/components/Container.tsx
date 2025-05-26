import { AddTaskIcon } from "./Icons";
import { useMemo, useState } from "react";
import { useStore } from "../store";
import Card from "./Card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  content: z.string().nonempty("Description is required"),
  dueDate: z.string().nonempty("Due date is required"),
  type: z.string().nonempty("Task type is required"),
});

type FormProps = z.infer<typeof schema>;

type Props = {
  state: "To-Do" | "In-Progress" | "Completed";
  heading?: string;
  description: string;
};

const Container = ({ state, heading, description }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormProps>({
    defaultValues: {
      title: "",
      content: "",
      dueDate: "",
      type: "Work",
    },
    resolver: zodResolver(schema),
  });

  const [open, setOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const tasks = useStore((store) => store.tasks);
  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  const filtered = useMemo(
    () => tasks.filter((task) => task.state === state),
    [tasks, state]
  );

  const onSubmit = (data: FormProps) => {
    addTask(data.title, data.content, state, data.type, data.dueDate);
    reset();
    setOpen(false);
  };

  return (
    <div
      className={`min-h-[43rem] w-[22rem] bg-primary-color rounded-[1.4rem] pt-[2.6rem] px-[2rem] flex flex-col transition-all duration-200 ${
        isDragOver ? "border-2 border-dotted border-[#81C3FF]" : ""
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true)
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={() => {
        if (draggedTask) moveTask(draggedTask, state);
        setDraggedTask(null);
        setIsDragOver(false)
      }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-[22px] font-semibold flex items-center gap-2">
  {state}
  <span
    className={`text-white text-xs font-medium px-2 py-0.5 rounded-full ${
      state === "To-Do"
        ? "bg-blue-500"
        : state === "In-Progress"
        ? "bg-yellow-400"
        : "bg-green-500"
    }`}
  >
    {filtered.length}
  </span>
</h1>
        <button onClick={() => setOpen(true)}>
          <AddTaskIcon />
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="border-[#81C3FF] w-[98%] h-[275px] mt-16 rounded-3xl border-dotted border-2 flex flex-col justify-center items-center">
          <h1 className="font-bold text-gray-700 text-[14px]">{heading}</h1>
          <p className="text-gray-500 text-[14px]">{description}</p>
        </div>
      ) : (
        <div className="mt-16">
          {filtered.map((task) => (
            <Card
              key={task.id}
              title={task.title}
              content={task.content}
              type={task.type}
              dueDate={task.dueDate}
            />
          ))}
        </div>
      )}

      {open && (
        <div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="bg-white shadow-lg p-6 w-[20rem] rounded-[1.5rem] flex flex-col gap-3"
          >
            <input
              {...register("title")}
              placeholder="Task Title"
              className="p-2 rounded border focus:outline-blue-400"
            />
            <p className="text-red-500 text-sm">{errors.title?.message}</p>

            <textarea
              {...register("content")}
              placeholder="Task Description"
              className="p-2 rounded border focus:outline-blue-400"
            />
            <p className="text-red-500 text-sm">{errors.content?.message}</p>

            <select
              {...register("type")}
              className="p-2 rounded border focus:outline-blue-400"
            >
              <option value="Work">Work</option>
              <option value="School">School</option>
              <option value="Self">Self</option>
            </select>
            <p className="text-red-500 text-sm">{errors.type?.message}</p>

            <input
              type="date"
              {...register("dueDate")}
              className="p-2 rounded border focus:outline-blue-400"
            />
            <p className="text-red-500 text-sm">{errors.dueDate?.message}</p>

            <div className="flex justify-between gap-4 mt-2">
              <button
                type="submit"
                className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
              >
                Add Task
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  reset();
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Container;
