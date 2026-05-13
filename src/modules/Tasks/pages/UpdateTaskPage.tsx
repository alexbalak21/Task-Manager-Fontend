import { useEffect, useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import AppShellLayout from "../../../layouts/AppShellLayout";
import TaskFormContainer from "../../TaskForm/TaskFormContainer";
import { useTasksStore } from "../state/tasks.store";

export default function UpdateTaskPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const parsedTaskId = Number(taskId);
  const isValidTaskId = Number.isInteger(parsedTaskId) && parsedTaskId > 0;

  const tasks = useTasksStore((state) => state.tasks);
  const loading = useTasksStore((state) => state.loading);
  const error = useTasksStore((state) => state.error);
  const loadTaskById = useTasksStore((state) => state.loadTaskById);

  const task = useMemo(
    () => tasks.find((item) => item.id === parsedTaskId),
    [parsedTaskId, tasks],
  );

  useEffect(() => {
    if (!isValidTaskId) {
      return;
    }

    void loadTaskById(parsedTaskId);
  }, [isValidTaskId, loadTaskById, parsedTaskId]);

  if (!isValidTaskId) {
    return <Navigate to="/tasks" replace />;
  }

  return (
    <AppShellLayout>
      <section className="p-8 lg:p-6">
        {loading && !task ? (
          <div className="rounded-lg bg-white p-8 shadow-sm">Loading task...</div>
        ) : null}

        {!loading && error && !task ? (
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-red-600">{error}</p>
            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="mt-4 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-800"
            >
              Back to tasks
            </button>
          </div>
        ) : null}

        {!loading && !error && !task ? (
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-red-600">Task not found.</p>
            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="mt-4 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-800"
            >
              Back to tasks
            </button>
          </div>
        ) : null}

        {task ? (
          <TaskFormContainer
            mode="edit"
            task={task}
            onSuccess={() => navigate("/tasks")}
          />
        ) : null}
      </section>
    </AppShellLayout>
  );
}
