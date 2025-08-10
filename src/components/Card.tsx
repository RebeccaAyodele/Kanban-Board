import { useStore } from "../store";
import { useState } from "react";
import profile from "../images/profile.jpg";
import { DeleteIcon, DragIcon, EditIcon } from "./Icons";

type Props = {
  id: string;
  title: string;
  content: string;
  type: "Work" | "School" | "Self";
  dueDate: string;
  highlight?: boolean;
};



const Card = ({ title, content, type, dueDate, highlight }: Props) => {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  const deleteTask = useStore((store) => store.deleteTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const editTask = useStore((store) => store.editTask);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [editedType, setEditedType] = useState<"Work" | "School" | "Self">(type);
  const [editedDueDate, setEditedDueDate] = useState(dueDate);

  const handleSave = () => {
    if (!task) return;
    editTask(task.title, {
      title: editedTitle,
      content: editedContent,
      type: editedType,
      dueDate: editedDueDate,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(title);
    setEditedContent(content);
    setEditedType(type);
    setEditedDueDate(dueDate);
  };

  return (
    <div className={`h-64 mb-8 bg-white shadow-gray-400 rounded-xl drop-shadow-xl p-6 relative cursor-pointer transition-all z-10 ${
        highlight ? "bg-yellow-100 border-2 border-yellow-400" : "bg-white"
      }`}
      draggable
      onDragStart={() => {
        if (task?.title) {
          setDraggedTask(task.title);
        }
      }}
    >
      <div className="relative mb-3">
        <img src={profile} alt="profile" className="w-6 h-6" />
      </div>

      {isEditing ? (
        <>
          <input
            className="w-full mb-2 border border-gray-300 rounded p-1"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            className="w-full mb-2 border border-gray-300 rounded p-1"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <select
            className="w-full mb-2 border border-gray-300 rounded p-1"
            value={editedType}
            onChange={(e) => setEditedType(e.target.value as "Work" | "School" | "Self")}
          >
            <option value="Work">Work</option>
            <option value="School">School</option>
            <option value="Self">Self</option>
          </select>
          <input
            className="w-full mb-2 border border-gray-300 rounded p-1"
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div className="relative h-full">
          <h1 className="text-xl font-semibold my-2">{title}</h1>
          <p className="text-gray-600">{content}</p>

          <div className="flex justify-between items-center mt-4 absolute mb-8 w-full bottom-0">
            <div className="flex items-center gap-2">
              <div className="bg-green-200 rounded-lg px-2 py-1 text-center">
                <h3>{type}</h3>
              </div>
              <p className="text-[9px] font-thin text-gray-600">{dueDate}</p>
            </div>
            <div className="flex gap-2 items-center">
              <div onClick={() => setIsEditing(true)}>
                <EditIcon />
              </div>
              <div
                onClick={() => {
                  if (task) deleteTask(task.title);
                }}
              >
                <DeleteIcon />
              </div>
              <DragIcon />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
