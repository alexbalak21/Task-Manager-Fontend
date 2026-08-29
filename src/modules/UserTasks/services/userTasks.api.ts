import { api } from "../../../services/api";

export const UserTasksAPI = {
  assignUserToTask: (userId: number, taskId: number) =>
    api.post<{ success: boolean }>("/api/user-tasks/assign", {
      user_id: userId,
      task_id: taskId,
    }),

  unassignUserFromTask: (userId: number, taskId: number) =>
    api.post<{ success: boolean }>("/api/user-tasks/unassign", {
      user_id: userId,
      task_id: taskId,
    }),

  getUsersByTask: (taskId: number) =>
    api.get<{ user_ids: number[] }>(`/api/user-tasks/task/${taskId}`),

  getTasksByUser: (userId: number) =>
    api.get<{ task_ids: number[] }>(`/api/user-tasks/user/${userId}`),
};
