import { create } from "zustand";

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
}

export const useStore = create<StoreProps>((set) => ({
    tasks: [{ title: "TestTask", state: "To-Do", content: "Using figma design tool, design a simple kanban board with the following design requirement and minimum components", type: "Work", dueDate: "Feb 28" }],
    addTask: (title, content, state, type, dueDate) => 
      set((store) => ({
        tasks: [...store.tasks, {title, content, state, type, dueDate}]
      }))
}) )