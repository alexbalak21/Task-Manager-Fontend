import { api } from "../../../services/api.ts";

export type TaskDto = {
  id: number;
  title: string;
  description: string | null;
  priority_id: number;
  status_id: number;
  start_date: string | null;
  due_date: string | null;
  created_at: string | null;
  updated_at: string | null;
  users: number[];
  todos: string[];
  attachments: string[];
};

export type CreateTaskPayload = {
  title: string;
  description: string;
  priority_id: number;
  status_id: number;
  start_date: string;
  due_date: string;
  users: number[];
  todos: string[];
  attachments: string[];
};

export const TasksAPI = {
  getAll: () => api.get<TaskDto[]>("/api/tasks"),
  create: (payload: CreateTaskPayload) => api.post<TaskDto>("/api/tasks", payload),
};
