import { AddTaskIcon } from "./Icons";
import { useMemo, useState } from "react";
import { useStore } from "../store";
import Card from "./Card";

type Props = {
  state: "To-Do" | "In-Progress" | "Completed";
  heading?: string;
  description: string;
};

const Container = ({ state, heading, description }: Props) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const tasks = useStore((store) => store.tasks);
  const filtered = useMemo(
    () => tasks.filter((task) => task.state === state),
    [tasks, state]
  );

  const addTask = useStore((store) => store.addTask);

  return (
    <div className="min-h-[706px] w-[28%] bg-primary-color rounded-[1.4rem] pt-[2.6rem] px-[2rem] mt-8 flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-[22px] font-semibold">{state}</h1>
        <button onClick={() => setOpen(true)}> <AddTaskIcon /></button>

        {open && (
          <div className="absolute w-full h-full top-0 left-0">
            <div className="bg-blue-300 absolute z-1 p-4 h-screen/2 w-screen/2 left-1/3 top-1/2 translate-x-1/2 translate-y-1/2 flex justify-center items-center">
              <input onChange={(e) => setText(e.target.value)} value={text} />
            <button
            onClick={() => {
              addTask(text, state);
              setText("");
              setOpen(false);
            }}
          >Add</button>
            </div>
          </div>
        )}
      </div>
      <div className="border-[#81C3FF] w-[98%] h-[275px] mt-[4rem] rounded-3xl border-dotted border-2 flex flex-col justify-center items-center">
        <h1 className="font-bold text-gray-700 text-[14px]">{heading}</h1>
        <p className="text-gray-500 text-[14px]">{description}</p>
        {filtered.map((task) => (
          <Card
            title={task.title}
            content="Using figma design tool, design a simple kanban board with the following design requirement and minimum components"
            key={task.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Container;
