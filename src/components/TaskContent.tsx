import React, { createContext, useContext, useReducer } from "react";

type Task = {
    id: number;
    text: string;
    done: boolean;
}

type Action = 
| {type: "added", id: number, text: string }
| {type: "changed", task: Task}
| {type: "deleted", id: number}

type TaskProviderProps = {
  children: React.ReactNode;
};



const TaskContext = createContext<Task[] | null>(null);
const TaskDispatchContext = createContext<React.Dispatch<Action> | null>(null);

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  return (
    <TaskContext.Provider value={tasks}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}

export function useTasksDispatch() {
  return useContext(TaskDispatchContext);
}

function tasksReducer(tasks: Task[], action: Action): Task[] {
  switch (action.type) {
    case "added": {
      return [...tasks, { id: action.id, text: action.text, done: false }];
    }
    case "changed": {
        return tasks.map(t => {
            if(t.id === action.task.id) {
                return action.task;
            } else {
                return t;
            }
        })
    }
    case "deleted": {
        return tasks.filter(t => t.id !== action.id)
    }
    default: {
        throw Error("Unknown action " + (action as any).type)
    }
  }
}

const initialTasks = [
    { id: 0, text: 'Philosopher’s Path', done: true },
    { id: 1, text: 'Visit the temple', done: false },
    { id: 2, text: 'Drink matcha', done: false }
  ];
  