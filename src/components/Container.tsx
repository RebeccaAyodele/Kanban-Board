import { AddTaskIcon } from "./Icons";
import { useMemo } from "react";
import { useStore } from "../store";
import Card from "./Card";

type Props = {
    state: "To-Do" | "In-Progress" | "Completed";
    heading?: string;
    description: string;
}

const Container = ({state, heading, description}: Props) => {
  const tasks = useStore((store) => 
  store.tasks);
  const filtered = useMemo(() => tasks.filter((task) => task.state === state), [tasks, state])
  return (
    <div className="min-h-[706px] w-[28%] bg-primary-color rounded-[1.4rem] pt-[2.6rem] px-[2rem] mt-8 flex flex-col">
        <div className="flex justify-between items-center">
        <h1 className="text-[22px] font-semibold">{state}</h1>
        <AddTaskIcon />
        </div>
        <div className="border-[#81C3FF] w-[98%] h-[275px] mt-[4rem] rounded-3xl border-dotted border-2 flex flex-col justify-center items-center">
            <h1 className="font-bold text-gray-700 text-[14px]">{heading}</h1>
            <p className="text-gray-500 text-[14px]">{description}</p>
            {filtered.map((task)=><Card title={task.title} content="Using figma design tool, design a simple kanban board with the following design requirement and minimum components" key={task.title} />)}
        </div>
    </div>
  )
}

export default Container