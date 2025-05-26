import { useStore } from "../store";
import { ReactNode } from "react";
import profile from "../images/profile.jpg";
import { DeleteIcon, DragIcon, EditIcon } from "./Icons";

type Props = {
  title: string;
  content: string;
  type: "Work" | "School" | "Self";
  dueDate: ReactNode;
};

const Card = ({ title, content, type, dueDate }: Props) => {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );

  const deleteTask = useStore((store) => store.deleteTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);

  return (
    <div
      className="w-[292px] h-[260px] mb-4 mt-10 bg-white shadow-gray-400 rounded-xl drop-shadow-xl p-6 relative cursor-pointer"
      draggable
      onDragStart={() => {
        if (task?.title) {
          {
            setDraggedTask(task?.title);
          }
        }
      }}
    >
      <div className="relative">
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
            <div className="bg-green-200 rounded-lg w px-2 py-1 text-center">
              <h3>{type}</h3>
            </div>
            <p className="text-[9px] font-thin text-gray-600">{dueDate}</p>
          </div>
        </div>
        <div className="flex gap-2">
            <DragIcon />
          <EditIcon />
          <div
            onClick={() => {
              if (task) deleteTask(task.title);
            }}
          >
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
