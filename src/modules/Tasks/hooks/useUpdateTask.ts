import { useState } from "react";
import axios from "axios";
import { TasksAPI } from "../services/tasks.api";
import type { TaskDto } from "../types/task.dto";
import type { UpdateTaskPayload } from "../types/task.payloads";

type UseUpdateTaskResult = {
  updateTask: (id: number, payload: UpdateTaskPayload) => Promise<TaskDto>;
  isSubmitting: boolean;
  error: string | null;
};

function resolveErrorMessage(error: unknown): string {
  if (axios.isAxiosError<{ message?: string; error?: string }>(error)) {
    const apiMessage = error.response?.data?.message ?? error.response?.data?.error;
    if (apiMessage) {
      return apiMessage;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Could not update task";
}

export function useUpdateTask(): UseUpdateTaskResult {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTask = async (id: number, payload: UpdateTaskPayload) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await TasksAPI.update(id, payload);
      return response.data;
    } catch (err) {
      const message = resolveErrorMessage(err);
      setError(message);
      throw new Error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    updateTask,
    isSubmitting,
    error,
  };
}
