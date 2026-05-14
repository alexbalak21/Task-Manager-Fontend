import SelectUsersModal from "../Users/components/SelectUsersModal";
import TaskTitleInput from "./components/TaskTitleInput";
import TaskDescriptionInput from "./components/TaskDescriptionInput";
import TaskPrioritySelect from "./components/TaskPrioritySelect";
import TaskDueDateInput from "./components/TaskDueDateInput";
import TaskAssignees from "./components/TaskAssignees";
import TaskTodoList from "./components/TaskTodoList";
import TaskAttachments from "./components/TaskAttachments";

import { useTaskForm } from "./hooks/useTaskForm";
import { useTodoList } from "./hooks/useTodoList";
import { useAttachments } from "./hooks/useAttachments";
import { useAssignees } from "./hooks/useAssignees";
import { useEffect, useMemo, useRef, useState } from "react";
import type { TaskDto } from "../Tasks/types/task.dto";
import { useUsersStore } from "../Users/state/users.store";
import { usePriorityStore } from "../Priority/store/priority.store";
import { TodosAPI } from "../Todos/services/todo.api";
import type { TodoDto } from "../Todos/types/todo.dto";

type TaskFormContainerProps = {
  mode?: "create" | "edit";
  task?: TaskDto;
  onSuccess?: () => void;
};

const toDateInput = (dateTime: string | null) => {
  if (!dateTime) {
    return "";
  }

  const datePart = dateTime.slice(0, 10);
  const parsed = new Date(datePart);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return datePart;
};

const toTodoItems = (todos: unknown[] | undefined) => {
  if (!todos) {
    return [];
  }

  return todos.flatMap((item, index) => {
    if (typeof item === "string") {
      return [{
        id: `todo-${index}-${item}`,
        text: item,
      }];
    }

    if (
      typeof item === "object" &&
      item !== null &&
      "id" in item &&
      "text" in item &&
      typeof item.id === "number" &&
      typeof item.text === "string"
    ) {
      return [{
        id: `todo-${item.id}`,
        text: item.text,
      }];
    }

    return [];
  });
};

const toAttachments = (attachments: unknown[] | undefined) => {
  if (!attachments) {
    return [];
  }

  return attachments.filter((item): item is string => typeof item === "string");
};

export default function TaskFormContainer({
  mode = "create",
  task,
  onSuccess,
}: TaskFormContainerProps) {
  const allUsers = useUsersStore((state) => state.users);
  const priorities = usePriorityStore((state) => state.priorities);
  const [fetchedTodos, setFetchedTodos] = useState<TodoDto[]>([]);
  const lastFetchedTodoIdsKeyRef = useRef<string>("");

  useEffect(() => {
    if (mode === "edit" && task?.todos && Array.isArray(task.todos)) {
      const todoIds = task.todos.filter((id): id is number => typeof id === "number");
      if (todoIds.length > 0) {
        const requestKey = [...todoIds].sort((a, b) => a - b).join(",");
        if (lastFetchedTodoIdsKeyRef.current === requestKey) {
          return;
        }

        lastFetchedTodoIdsKeyRef.current = requestKey;
        void (async () => {
          try {
            console.log("Fetching todos with IDs:", todoIds);
            const response = await TodosAPI.getByIds(todoIds);
            console.log("Fetched todos:", response.data);
            setFetchedTodos(response.data);
          } catch (error) {
            console.error("Failed to fetch todos by IDs:", error);
            if (typeof task?.id === "number") {
              try {
                console.log("Falling back to fetch todos by task ID:", task.id);
                const fallbackResponse = await TodosAPI.getByTaskId(task.id);
                console.log("Fetched todos (fallback):", fallbackResponse.data);
                setFetchedTodos(fallbackResponse.data);
                return;
              } catch (fallbackError) {
                console.error("Failed to fetch todos by task ID:", fallbackError);
                // Fall through to empty state if fallback also fails.
              }
            }

            setFetchedTodos([]);
          }
        })();
      } else {
        lastFetchedTodoIdsKeyRef.current = "";
        setFetchedTodos([]);
      }
    } else {
      lastFetchedTodoIdsKeyRef.current = "";
      setFetchedTodos([]);
    }
  }, [mode, task?.id, task?.todos]);

  const initialTodoItems = useMemo(() => {
    if (mode === "edit") {
      return toTodoItems(fetchedTodos);
    }
    return toTodoItems(task?.todos as unknown[] | undefined);
  }, [fetchedTodos, mode, task?.todos]);

  const initialAttachments = useMemo(
    () => toAttachments(task?.attachments as unknown[] | undefined),
    [task?.attachments],
  );

  const initialAssignedMembers = useMemo(
    () =>
      (task?.users ?? []).map((userId) => {
        const matchedUser = allUsers.find((user) => user.id === userId);
        return {
          id: String(userId),
          name: matchedUser?.name ?? `U${userId}`,
        };
      }),
    [allUsers, task?.users],
  );

  const initialPriorityName = useMemo(() => {
    if (!task?.priority_id) {
      return undefined;
    }

    return priorities.find((priority) => priority.id === task.priority_id)?.name;
  }, [priorities, task?.priority_id]);

  const initialFormData = useMemo(
    () => ({
      title: task?.title ?? "",
      description: task?.description ?? "",
      priority: initialPriorityName,
      dueDate: toDateInput(task?.due_date ?? null),
    }),
    [initialPriorityName, task?.description, task?.due_date, task?.title],
  );

  // -------------------------
  // TODO LIST HOOK
  // -------------------------
  const {
    todoItems,
    todoInput,
    handleTodoInput,
    handleAddTodo,
    handleRemoveTodo,
    handleTodoKeyDown,
    resetTodoList,
  } = useTodoList({ initialTodoItems });

  // -------------------------
  // ATTACHMENTS HOOK
  // -------------------------
  const {
    attachments,
    attachmentInput,
    setAttachmentInput,
    addAttachment,
    removeAttachment,
    resetAttachments,
  } = useAttachments({ initialAttachments });

  // -------------------------
  // ASSIGNEES HOOK
  // -------------------------
  const {
    assignedMembers,
    users,
    loading,
    usersError,
    isMembersModalOpen,
    openModal,
    closeModal,
    removeAssignedMember,
    handleSelectMembers,
    resetAssignees,
  } = useAssignees({ initialAssignedMembers });

  // -------------------------
  // FORM HOOK
  // -------------------------
  const { formData, handleInputChange, handleSubmit, isSubmitting, error } =
    useTaskForm({
      assignedMembers,
      todoItems,
      attachments,
      mode,
      taskId: task?.id,
      initialFormData,
      initialStatusId: task?.status_id,
      initialStartDate: task?.start_date,
      onSuccess: () => {
        if (mode === "create") {
          resetTodoList();
          resetAttachments();
          resetAssignees();
        }
        onSuccess?.();
      },
    });

  return (
    <div className="mx-auto max-w-5xl rounded-lg bg-white p-8 shadow-sm">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        {mode === "edit" ? "Update Task" : "Create Task"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TITLE */}
        <TaskTitleInput value={formData.title} onChange={handleInputChange} />

        {/* DESCRIPTION */}
        <TaskDescriptionInput
          value={formData.description}
          onChange={handleInputChange}
        />

        {/* PRIORITY / DATE / ASSIGN */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <TaskPrioritySelect
            value={formData.priority}
            onChange={handleInputChange}
          />

          <TaskDueDateInput
            value={formData.dueDate}
            onChange={handleInputChange}
          />

          <TaskAssignees
            assignedMembers={assignedMembers}
            loading={loading}
            onRemove={removeAssignedMember}
            onOpenModal={openModal}
          />
        </div>

        {/* TODO LIST */}
        <TaskTodoList
          TodoItems={todoItems}
          input={todoInput}
          onInput={handleTodoInput}
          onAdd={handleAddTodo}
          onRemove={handleRemoveTodo}
          onKeyDown={handleTodoKeyDown}
        />

        {/* ATTACHMENTS */}
        <TaskAttachments
          attachments={attachments}
          input={attachmentInput}
          onInput={setAttachmentInput}
          onAdd={addAttachment}
          onRemove={removeAttachment}
        />

        {/* ERRORS */}
        {usersError && (
          <p className="text-sm font-medium text-red-600">{usersError}</p>
        )}

        {error && (
          <p className="text-sm font-medium text-red-600">{error}</p>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-primary-450 py-3 font-semibold text-white"
        >
          {mode === "edit"
            ? isSubmitting
              ? "UPDATING TASK..."
              : "UPDATE TASK"
            : isSubmitting
              ? "CREATING TASK..."
              : "CREATE TASK"}
        </button>
      </form>

      {/* USERS MODAL */}
      <SelectUsersModal
        isOpen={isMembersModalOpen}
        onClose={closeModal}
        users={users}
        defaultSelectedIds={assignedMembers.map((m) => m.id)}
        onDone={handleSelectMembers}
      />
    </div>
  );
}
