import { create } from "zustand";

type Task = {
    title: string
    state: "To-Do" | "In-Progress" | "Completed"
}

type StoreProps = {
    tasks: Task[]
}

const store = (): StoreProps => ({
    tasks: [{ title: "TestTask", state: "To-Do" }]
})

export const useStore = create<StoreProps>(store)