import { create } from "zustand";

type Task = {
    title: string
    state: "To-Do" | "In-Progress" | "Completed"
}

type StoreProps = {
    tasks: Task[]
    addTask: (title: string, state: Task["state"]) => void
}

export const useStore = create<StoreProps>((set) => ({
    tasks: [{ title: "TestTask", state: "To-Do" }],
    addTask: (title, state) => 
      set((store) => ({
        tasks: [...store.tasks, {title, state}]
      }))
}) )