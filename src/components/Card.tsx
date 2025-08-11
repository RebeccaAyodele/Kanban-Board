import { useStore } from "../store";
import { useState } from "react";
import profile from "../images/profile.jpg";
import { DeleteIcon, EditIcon } from "./Icons";
import { HiDotsVertical } from "react-icons/hi";
import useIsMobile from "./useIsMobile";

type Props = {
  id: string;
  title: string;
  content: string;
  type: "Work" | "School" | "Self";
  dueDate: string;
  highlight?: boolean;
};

const Card = ({ id, title, content, type, dueDate, highlight }: Props) => {
  const task = useStore((store) => store.tasks.find((t) => t.id === id));
  const deleteTask = useStore((store) => store.deleteTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const editTask = useStore((store) => store.editTask);
  const moveTask = useStore((store) => store.moveTask);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [editedType, setEditedType] = useState<"Work" | "School" | "Self">(type);
  const [editedDueDate, setEditedDueDate] = useState(dueDate);
  const [showMenu, setShowMenu] = useState(false);

  const isMobile = useIsMobile();

  const handleSave = () => {
    if (!task) return;
    editTask(task.id, {
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
    <div
      className={`min-h-64 bg-white sm:border-none border-blue-200 border-2 sm:shadow-gray-400 rounded-xl drop-shadow-xl p-6 flex flex-col cursor-pointer transition-all z-10 mb-8 ${
        highlight ? "bg-yellow-100 border-2 border-yellow-400" : "bg-white"
      }`}
      draggable
      onDragStart={() => {
        if (task?.id) {
          setDraggedTask(task.id);
        }
      }}
    >
      {/* Profile and optional menu button */}
      <div className="flex justify-between items-start mb-3">
        <img src={profile} alt="profile" className="w-6 h-6" />
        {isMobile && (
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <HiDotsVertical className="text-xl" />
          </button>
        )}
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
            onChange={(e) =>
              setEditedType(e.target.value as "Work" | "School" | "Self")
            }
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
        <div className="relative h-full flex-grow">
          <h1 className="text-xl font-semibold my-2">{title}</h1>
          <p className="text-gray-600">{content}</p>

          <div className="flex justify-between items-center w-full absolute bottom-0">
            <div className="flex items-center gap-2">
              <div className="bg-green-200 rounded-lg px-2 py-1 text-center">
                <h3>{type}</h3>
              </div>
              <p className="text-[9px] font-thin text-gray-600">{dueDate}</p>
            </div>

            {!isMobile && (
              <div className="flex gap-2 items-center">
                <div onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </div>
                <div onClick={() => deleteTask(id)}>
                  <DeleteIcon />
                </div>
              </div>
            )}
          </div>

          {/* Dropdown menu for mobile */}
          {isMobile && showMenu && (
            <div className="absolute top-8 right-2 bg-white border rounded shadow-md z-50">
              <ul className="flex flex-col">
                {task?.state !== "To-Do" && (
                  <li
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      moveTask(id, "To-Do");
                      setShowMenu(false);
                    }}
                  >
                    Move to To-Do
                  </li>
                )}
                {task?.state !== "In-Progress" && (
                  <li
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      moveTask(id, "In-Progress");
                      setShowMenu(false);
                    }}
                  >
                    Move to In-Progress
                  </li>
                )}
                {task?.state !== "Completed" && (
                  <li
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      moveTask(id, "Completed");
                      setShowMenu(false);
                    }}
                  >
                    Move to Completed
                  </li>
                )}
                <li
                  className="px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setIsEditing(true);
                    setShowMenu(false);
                  }}
                >
                  Edit
                </li>
                <li
                  className="px-4 py-2 text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    deleteTask(id);
                    setShowMenu(false);
                  }}
                >
                  Delete
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
