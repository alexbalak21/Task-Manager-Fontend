import type { TaskDto } from "../types/task.dto";
import { api } from "../../../services/api"; 
import type { CreateTaskPayload, UpdateTaskPayload } from "../types/task.payloads";

export const TasksAPI = {
  getAll: () => api.get<TaskDto[]>("/api/tasks"),
  getById: (id: number) => api.get<TaskDto>(`/api/tasks/${id}`),
  create: (payload: CreateTaskPayload) => api.post<TaskDto>("/api/tasks", payload),
  update: (id: number, payload: UpdateTaskPayload) =>
    api.put<TaskDto>(`/api/tasks/${id}`, payload),
};
