// import { useStore } from "../store";
import { ReactNode } from "react";
import profile from "../images/profile.jpg";
import { DeleteIcon, DragIcon, EditIcon } from "./Icons";

type Props = {
  title: string;
  content: string;
  type: "Work" | "School" | "Self"
  dueDate: ReactNode
};

const Card = ({ title, content, type, dueDate }: Props) => {
  // const task = useStore((store) =>
  //   store.tasks.find((task) => task.title === title)
  // );
  return (
    <div className="w-[292px] h-[275px] bg-white shadow-gray-400 rounded-xl drop-shadow-xl p-6 relative">
      <div>
        <img src={profile} alt="profile" className="w-6 h-6" />
      </div>
      <div>
        <h1 className="text-xl font-semibold my-2">{title}</h1>
      </div>
      <div>
        <p className="text-gray-600">{content}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="bg-green-200 rounded w-[46px] h-[26px] text-center">
              <h3>{type}</h3>
            </div>
            <p className="text-[8px] font-thin text-gray-500">{dueDate}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <DragIcon />
          <EditIcon />
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
};

export default Card;
