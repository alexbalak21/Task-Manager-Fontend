import { useState, type ChangeEvent, type FormEvent } from "react";
import { useToast } from "../../../../../components/ui/ToastProvider";
import { useCreateTask } from "../../../hooks/useCreateTask";
import type { AssignedMember } from "./useAssignees";
import type { TodoItem } from "./useTodoList";

export interface TaskFormData {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
}

interface UseTaskFormParams {
  assignedMembers: AssignedMember[];
  todoItems: TodoItem[];
  attachments: string[];
  onSuccess: () => void;
}

interface UseTaskFormResult {
  formData: TaskFormData;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}

const PRIORITY_TO_ID: Record<string, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
  Urgent: 4,
};

const DEFAULT_STATUS_ID = 1;

const getTodayLocalDate = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

const toApiDateTime = (date: string, time: string) => `${date}T${time}`;

const toNumericUserId = (value: string) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

export function useTaskForm({
  assignedMembers,
  todoItems,
  attachments,
  onSuccess,
}: UseTaskFormParams): UseTaskFormResult {
  const toast = useToast();
  const { createTask, isSubmitting, error } = useCreateTask();

  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = formData.title.trim();
    if (!title) {
      toast.error("Title is required");
      return;
    }

    if (!formData.dueDate) {
      toast.error("Due date is required");
      return;
    }

    const users = assignedMembers
      .map((member) => toNumericUserId(member.id))
      .filter((id): id is number => id !== null);

    const todos = todoItems
      .map((item) => item.text.trim())
      .filter((todo) => todo.length > 0);

    const priorityId = PRIORITY_TO_ID[formData.priority] ?? PRIORITY_TO_ID.Low;
    const startDate = toApiDateTime(getTodayLocalDate(), "09:00:00");
    const dueDate = toApiDateTime(formData.dueDate, "10:00:00");

    try {
      await createTask({
        title,
        description: formData.description.trim(),
        priority_id: priorityId,
        status_id: DEFAULT_STATUS_ID,
        start_date: startDate,
        due_date: dueDate,
        users,
        todos,
        attachments,
      });

      setFormData({
        title: "",
        description: "",
        priority: "Low",
        dueDate: "",
      });

      onSuccess();
      toast.success("Task created", "The task has been created successfully.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not create task";
      toast.error("Task creation failed", message);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    isSubmitting,
    error,
  };
}
