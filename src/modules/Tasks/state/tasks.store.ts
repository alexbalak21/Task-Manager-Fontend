import { create } from "zustand";
import { TasksAPI, type TaskDto } from "../services/tasks.api";

type TasksState = {
  tasks: TaskDto[];
  loading: boolean;
  error: string | null;
  loadTasks: () => Promise<void>;
  loadTaskById: (id: number) => Promise<TaskDto | null>;
};

export const useTasksStore = create<TasksState>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  loadTasks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await TasksAPI.getAll();
      set({ tasks: response.data, loading: false });
    } catch {
      set({ error: "Could not load tasks", loading: false });
    }
  },

  loadTaskById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = await TasksAPI.getById(id);
      set((state) => {
        const existingIndex = state.tasks.findIndex((task) => task.id === id);

        if (existingIndex === -1) {
          return {
            tasks: [...state.tasks, response.data],
            loading: false,
            error: null,
          };
        }

        const nextTasks = [...state.tasks];
        nextTasks[existingIndex] = response.data;
        return {
          tasks: nextTasks,
          loading: false,
          error: null,
        };
      });
      return response.data;
    } catch {
      set({ error: "Could not load task", loading: false });
      return null;
    }
  },
}));
