import { create } from "zustand";

type Task = {
    title: string;
    state: "To-Do" | "In-Progress" | "Completed"
}