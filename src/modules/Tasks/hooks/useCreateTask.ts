import { useState } from "react";
import axios from "axios";
import { TasksAPI } from "../services/tasks.api";
import type {  CreateTaskPayload } from "../types/task.payloads";
import type { TaskDto } from "../types/task.dto";


type UseCreateTaskResult = {
  createTask: (payload: CreateTaskPayload) => Promise<TaskDto>;
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

  return "Could not create task";
}

export function useCreateTask(): UseCreateTaskResult {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTask = async (payload: CreateTaskPayload) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await TasksAPI.create(payload);
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
    createTask,
    isSubmitting,
    error,
  };
}
