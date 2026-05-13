import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useToast } from "../../../components/ui/ToastProvider";
import { useCreateTask } from "../../Tasks/hooks/useCreateTask";
import { useUpdateTask } from "../../Tasks/hooks/useUpdateTask";
import type { AssignedMember } from "./useAssignees";
import type { TodoItem } from "./useTodoList";
import { usePriorityStore } from "../../Priority/store/priority.store";

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
  mode?: "create" | "edit";
  taskId?: number;
  initialFormData?: Partial<TaskFormData>;
  initialStatusId?: number;
  initialStartDate?: string | null;
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
  mode = "create",
  taskId,
  initialFormData,
  initialStatusId,
  initialStartDate,
  onSuccess,
}: UseTaskFormParams): UseTaskFormResult {
  const toast = useToast();
  const { createTask, isSubmitting: isCreating, error: createError } = useCreateTask();
  const { updateTask, isSubmitting: isUpdating, error: updateError } = useUpdateTask();
  const priorities = usePriorityStore((state) => state.priorities);

  const [formData, setFormData] = useState<TaskFormData>({
    title: initialFormData?.title ?? "",
    description: initialFormData?.description ?? "",
    priority: initialFormData?.priority ?? "Low",
    dueDate: initialFormData?.dueDate ?? "",
  });

  useEffect(() => {
    setFormData({
      title: initialFormData?.title ?? "",
      description: initialFormData?.description ?? "",
      priority: initialFormData?.priority ?? "Low",
      dueDate: initialFormData?.dueDate ?? "",
    });
  }, [
    initialFormData?.description,
    initialFormData?.dueDate,
    initialFormData?.priority,
    initialFormData?.title,
  ]);

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

    const normalizedPriorityName = formData.priority.trim().toLowerCase();
    const selectedPriority = priorities.find(
      (priority) => priority.name.trim().toLowerCase() === normalizedPriorityName,
    );
    const lowPriority = priorities.find(
      (priority) => priority.name.trim().toLowerCase() === "low",
    );
    const priorityId = selectedPriority?.id ?? lowPriority?.id ?? 1;
    const startDate = initialStartDate ?? toApiDateTime(getTodayLocalDate(), "09:00:00");
    const dueDate = toApiDateTime(formData.dueDate, "10:00:00");
    const statusId = initialStatusId ?? DEFAULT_STATUS_ID;

    try {
      const payload = {
        title,
        description: formData.description.trim(),
        priority_id: priorityId,
        status_id: statusId,
        start_date: startDate,
        due_date: dueDate,
        users,
        todos,
        attachments,
      };

      if (mode === "edit") {
        if (!taskId) {
          toast.error("Task update failed", "Missing task id");
          return;
        }

        await updateTask(taskId, payload);
        onSuccess();
        toast.success("Task updated", "The task has been updated successfully.");
      } else {
        await createTask(payload);

        setFormData({
          title: "",
          description: "",
          priority: lowPriority?.name ?? priorities[0]?.name ?? "Low",
          dueDate: "",
        });

        onSuccess();
        toast.success("Task created", "The task has been created successfully.");
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : mode === "edit"
            ? "Could not update task"
            : "Could not create task";
      toast.error(mode === "edit" ? "Task update failed" : "Task creation failed", message);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    isSubmitting: mode === "edit" ? isUpdating : isCreating,
    error: mode === "edit" ? updateError : createError,
  };
}
