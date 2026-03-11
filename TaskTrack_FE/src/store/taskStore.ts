import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Task } from "@/types";

interface TaskState {
  tasks: Task[];
  totalElements: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  setTasksPage: (data: { content: Task[]; totalElements: number; totalPages: number }) => void;
  addTask: (task: Task) => void;
  replaceTask: (id: number, task: Task) => void;
  removeTask: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTaskStore = create<TaskState>()(
  devtools(
    (set) => ({
      tasks: [],
      totalElements: 0,
      totalPages: 0,
      isLoading: false,
      error: null,

      setTasksPage: ({ content, totalElements, totalPages }) =>
        set({ tasks: content, totalElements, totalPages }),

      addTask: (task) =>
        set((state) => ({ tasks: [task, ...state.tasks] })),

      replaceTask: (id, task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? task : t)),
        })),

      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    { name: "TaskStore" }
  )
);

