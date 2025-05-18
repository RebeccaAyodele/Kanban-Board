import { create } from "zustand";
import { persist } from "zustand/middleware"

type Task = {
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
          tasks: [...store.tasks, {title, content, state, type, dueDate}]
        })),
        deleteTask: (title: string) =>
        set((store) => ({
          tasks: store.tasks.filter((task) => task.title !== title)
        })),
        draggedTask: null,
  
        setDraggedTask: (title: string  | null) => set({draggedTask: title}),
        moveTask: (title: string, state: Task["state"]) =>
        set((store) => ({
        tasks: store.tasks.map((task) =>
          task.title === title ? { ...task, state } : task
      ),
    })),   
  }),
  {
    name: "task-storage",
  }
  )
);