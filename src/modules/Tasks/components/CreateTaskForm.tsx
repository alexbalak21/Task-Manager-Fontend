import {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { Plus, Paperclip, Users } from "lucide-react";
import SelectUsersModal, { type SelectableUser } from "../../Users/components/SelectUsersModal";
import { useUsersStore } from "../../Users/state/users.store";
import { useToast } from "../../../components/ui/ToastProvider";
import { useCreateTask } from "../hooks/useCreateTask";
import { useAuthStore } from "../../auth/state/auth.store";

interface TodoItem {
  id: string;
  text: string;
}

interface AssignedMember {
  id: string;
  name: string;
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

export default function CreateTaskForm() {
  const currentUser = useAuthStore((state) => state.user);

  // FIX: split selectors → no infinite loops, no unknown types
  const allUsers = useUsersStore((state) => state.users);
  const loading = useUsersStore((state) => state.loading);
  const usersError = useUsersStore((state) => state.error);
  const loadUsers = useUsersStore((state) => state.loadUsers);

  // Filter AFTER selecting → stable, safe
  const users = allUsers.filter((u) => u.id !== currentUser?.id && u.role !== 'admin');

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const toast = useToast();
  const { createTask, isSubmitting, error } = useCreateTask();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
  });

  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [todoInput, setTodoInput] = useState("");
  const [assignedMembers, setAssignedMembers] = useState<AssignedMember[]>([]);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTodo = () => {
    if (todoInput.trim()) {
      setTodoItems((prev) => [
        ...prev,
        { id: Date.now().toString(), text: todoInput },
      ]);
      setTodoInput("");
    }
  };

  const handleRemoveTodo = (id: string) => {
    setTodoItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleTodoKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    handleAddTodo();
  };

  const handleAddAttachment = () => {
    const link = prompt("Enter file link:");
    if (link) setAttachments((prev) => [...prev, link]);
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const title = formData.title.trim();
    if (!title) return toast.error("Title is required");

    if (!formData.dueDate) return toast.error("Due date is required");

    const users = assignedMembers
      .map((m) => toNumericUserId(m.id))
      .filter((id): id is number => id !== null);

    const todos = todoItems
      .map((item) => item.text.trim())
      .filter((t) => t.length > 0);

    const priorityId = PRIORITY_TO_ID[formData.priority] ?? 1;
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
      });

      setFormData({
        title: "",
        description: "",
        priority: "Low",
        dueDate: "",
      });

      setTodoItems([]);
      setTodoInput("");
      setAssignedMembers([]);
      setAttachments([]);

      toast.success("Task created", "The task has been created successfully.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not create task";
      toast.error("Task creation failed", message);
    }
  };

  return (
    <div className="mx-auto max-w-5xl rounded-lg bg-white p-8 shadow-sm">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        Create Task
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TITLE */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
            Task Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Create App UI"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={5}
            placeholder="Describe task"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
          />
        </div>

        {/* PRIORITY / DATE / ASSIGN */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* PRIORITY */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>

          {/* DUE DATE */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5"
            />
          </div>

          {/* ASSIGN TO */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
              Assign To
            </label>

            <button
              type="button"
              onClick={() => setIsMembersModalOpen(true)}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-zinc-100 py-2.5"
            >
              <Users /> {loading ? "Loading..." : "Add Members"}
            </button>

            {assignedMembers.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {assignedMembers.map((m) => (
                  <span
                    key={m.id}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700"
                  >
                    {m.name}
                    <button
                      type="button"
                      onClick={() =>
                        setAssignedMembers((prev) =>
                          prev.filter((x) => x.id !== m.id)
                        )
                      }
                      className="font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* TODO LIST */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
            TODO Checklist
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              onKeyDown={handleTodoKeyDown}
              placeholder="Enter Task"
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5"
            />
            <button
              type="button"
              onClick={handleAddTodo}
              className="rounded-lg bg-zinc-400 px-4 text-white"
            >
              <Plus size={20} />
            </button>
          </div>

          {todoItems.length > 0 && (
            <div className="mt-3 space-y-2">
              {todoItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                >
                  <span className="text-sm">{item.text}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTodo(item.id)}
                    className="text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ATTACHMENTS */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
            Add Attachments
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              disabled
              placeholder="Add File Link"
              className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5"
            />
            <button
              type="button"
              onClick={handleAddAttachment}
              className="rounded-lg bg-neutral-400 px-4 text-white"
            >
              <Plus size={20} />
            </button>
          </div>

          {attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {attachments.map((att, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <Paperclip size={16} />
                    <span className="truncate text-sm">{att}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(index)}
                    className="text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm font-medium text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-primary-450 py-3 font-semibold text-white"
        >
          {isSubmitting ? "CREATING TASK..." : "CREATE TASK"}
        </button>
      </form>

      {/* SINGLE MODAL */}
      <SelectUsersModal
        isOpen={isMembersModalOpen}
        onClose={() => setIsMembersModalOpen(false)}
        users={users.map((u) => ({
          id: String(u.id),
          name: u.name,
          email: u.email,
          profile_image: u.profile_image ?? "",
        }))}
        defaultSelectedIds={assignedMembers.map((m) => m.id)}
        onDone={(selected: SelectableUser[]) =>
          setAssignedMembers(
            selected.map((u) => ({ id: u.id, name: u.name }))
          )
        }
      />
    </div>
  );
}
