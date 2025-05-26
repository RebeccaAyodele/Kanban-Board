import { create } from "zustand";
import { persist } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid";

type Task = {
    id: string;
    title: string
    content: string
    type: "Work" | "School" | "Self"
    dueDate: string
    state: "To-Do" | "In-Progress" | "Completed"
}

type StoreProps = {
    tasks: Task[]
    addTask: (title: string, content: string, state: Task["state"], type: "Work" | "School" | "Self", dueDate: string) => void
    deleteTask: (title: string) => void
    editTask: (title: string, updatedData: Partial<Task>) => void
    draggedTask: string | null
    setDraggedTask: (title: string | null) => void
    moveTask: (title: string, state: Task["state"]) => void
}

export const useStore = create<StoreProps>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title, content, state, type, dueDate) => 
        set((store) => ({
          tasks: [...store.tasks, {id: uuidv4(), title, content, state, type, dueDate}]
        })),
        deleteTask: (id: string) =>
        set((store) => ({
          tasks: store.tasks.filter((task) => task.id !== id)
        })),
        editTask: (id: string, updatedData) =>
        set((state) => ({
        tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedData } : task
        ),
        })),
        
        draggedTask: null,
  
        setDraggedTask: (title: string  | null) => set({draggedTask: title}),
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