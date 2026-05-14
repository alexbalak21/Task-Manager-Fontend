import type { TodoDto } from "../types/todo.dto";
import { api } from "../../../services/api";

export const TodosAPI = {
  /**
   * Get all todos
   */
  getAll: () => api.get<TodoDto[]>("/api/todos"),

  /**
   * Get all todos for a specific task
   * @param taskId - Task ID
   */
  getByTaskId: (taskId: number) => api.get<TodoDto[]>(`/api/todos/task/${taskId}`),

  /**
   * Get todos by a list of IDs
   * @param todoIds - List of todo IDs
   */
  getByIds: (todoIds: number[]) =>
    api.get<TodoDto[]>("/api/todo/id", {
      params: { id: todoIds },
      paramsSerializer: {
        serialize: (params) => {
          const ids = params.id as number[];
          return ids.map((id) => `id=${encodeURIComponent(String(id))}`).join("&");
        },
      },
    }),

  /**
   * Get a single todo by ID
   * @param todoId - Todo ID
   */
  getById: (todoId: number) => api.get<TodoDto>(`/api/todos/${todoId}`),

  /**
   * Create a new todo (Admin only)
   * @param data - Todo data
   */
  create: (data: Partial<TodoDto>) =>
    api.post<TodoDto>("/api/todos", data),

  /**
   * Update a todo
   * @param todoId - Todo ID
   * @param data - Todo data to update
   */
  update: (todoId: number, data: Partial<TodoDto>) =>
    api.put<TodoDto>(`/api/todos/${todoId}`, data),

  /**
   * Delete a todo (Admin only)
   * @param todoId - Todo ID
   */
  delete: (todoId: number) => api.delete(`/api/todos/${todoId}`),
};
