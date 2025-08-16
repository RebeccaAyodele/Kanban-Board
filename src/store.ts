import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

type Task = {
  id: string;
  title: string;
  content: string;
  type: "Work" | "School" | "Self";
  dueDate: string;
  state: "To-Do" | "In-Progress" | "Completed";
};

type StoreProps = {
  tasks: Task[];
  addTask: (
    title: string,
    content: string,
    state: Task["state"],
    type: "Work" | "School" | "Self",
    dueDate: string
  ) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, updatedData: Partial<Task>) => void;
  draggedTask: string | null;
  setDraggedTask: (id: string | null) => void;
  moveTask: (id: string, state: Task["state"]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const useStore = create<StoreProps>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (title, content, state, type, dueDate) =>
        set((store) => ({
          tasks: [
            ...store.tasks,
            {
              id: uuidv4(),
              title,
              content,
              state,
              type,
              dueDate: new Date(dueDate).toISOString(),
            },
          ],
        })),

      deleteTask: (id: string) =>
        set((store) => ({
          tasks: store.tasks.filter((task) => task.id !== id),
        })),

      editTask: (id: string, updatedData) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  ...updatedData,
                  // ✅ ensure updated dueDate is ISO string if provided
                  dueDate: updatedData.dueDate
                    ? new Date(updatedData.dueDate).toISOString()
                    : task.dueDate,
                }
              : task
          ),
        })),

      draggedTask: null,

      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),

      setDraggedTask: (id: string | null) => set({ draggedTask: id }),

      moveTask: (id: string, state: Task["state"]) =>
        set((store) => ({
          tasks: store.tasks.map((task) =>
            task.id === id ? { ...task, state } : task
          ),
        })),
    }),
    {
      name: "task-storage",
    }
  )
);
