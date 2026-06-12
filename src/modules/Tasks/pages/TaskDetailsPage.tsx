import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import AppShellLayout from "../../../layouts/AppShellLayout";
import Modal from "../../../components/ui/Modal";
import { useAuthStore } from "../../auth/state/auth.store";
import TaskDetails from "../components/TaskDetails";
import { useTasksStore } from "../state/tasks.store";
import { TodosAPI } from "../../Todos/services/todo.api";
import type { TodoDto } from "../../Todos/types/todo.dto";

type ChecklistState = "pending" | "in_progress" | "completed";

const getTodoState = (todo: TodoDto): ChecklistState => {
	if (todo.completed) {
		return "completed";
	}

	if (todo.in_progress) {
		return "in_progress";
	}

	return "pending";
};

const getNextState = (state: ChecklistState): ChecklistState => {
	if (state === "pending") {
		return "in_progress";
	}

	if (state === "in_progress") {
		return "completed";
	}

	return "completed";
};

export default function TaskDetailsPage() {
	const { taskId } = useParams();
	const navigate = useNavigate();
	const user = useAuthStore((state) => state.user);
	const isAdmin = user?.role?.toLowerCase() === "admin";

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

	const [todos, setTodos] = useState<TodoDto[]>([]);
	const [todosLoading, setTodosLoading] = useState(false);
	const [todosError, setTodosError] = useState<string | null>(null);
	const [savingTodoId, setSavingTodoId] = useState<number | null>(null);
	const [reopenTodo, setReopenTodo] = useState<TodoDto | null>(null);

	useEffect(() => {
		if (!isValidTaskId) {
			return;
		}

		void loadTaskById(parsedTaskId);
	}, [isValidTaskId, loadTaskById, parsedTaskId]);

	useEffect(() => {
		if (!task?.todos?.length) {
			setTodos([]);
			setTodosError(null);
			setTodosLoading(false);
			return;
		}

		let isActive = true;
		setTodosLoading(true);
		setTodosError(null);

		void TodosAPI.getByIds(task.todos)
			.then((response) => {
				if (!isActive) {
					return;
				}

				setTodos(response.data);
			})
			.catch(() => {
				if (!isActive) {
					return;
				}

				setTodosError("Could not load todo checklist.");
				setTodos([]);
			})
			.finally(() => {
				if (isActive) {
					setTodosLoading(false);
				}
			});

		return () => {
			isActive = false;
		};
	}, [task?.id, task?.todos]);

	if (!isValidTaskId) {
		return <Navigate to="/tasks" replace />;
	}

	if (!task && loading && !error) {
		return (
			<AppShellLayout>
				<section className="p-8 lg:p-6">
					<div className="rounded-lg bg-white p-8 shadow-sm">Loading task...</div>
				</section>
			</AppShellLayout>
		);
	}

	if (!loading && error && !task) {
		return (
			<AppShellLayout>
				<section className="p-8 lg:p-6">
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
				</section>
			</AppShellLayout>
		);
	}

	if (!task) {
		return (
			<AppShellLayout>
				<section className="p-8 lg:p-6">
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
				</section>
			</AppShellLayout>
		);
	}

	const checklist = todos.map((todo) => ({
		id: String(todo.id),
		text: todo.text,
		state: getTodoState(todo),
	}));

	const handleToggleTodo = async (todoId: string) => {
		const currentTodo = todos.find((todo) => String(todo.id) === todoId);
		if (!currentTodo) {
			return;
		}

		const currentState = getTodoState(currentTodo);
		if (currentState === "completed") {
			setReopenTodo(currentTodo);
			return;
		}

		const nextState = getNextState(currentState);
		const updatedTodo: TodoDto = {
			...currentTodo,
			in_progress: nextState === "in_progress",
			completed: nextState === "completed",
			worked_by: user?.id ?? currentTodo.worked_by,
			completed_at: nextState === "completed" ? new Date().toISOString() : null,
		};

		setSavingTodoId(currentTodo.id);
		setTodos((prev) => prev.map((todo) => (todo.id === currentTodo.id ? updatedTodo : todo)));

		try {
			const response = await TodosAPI.update(currentTodo.id, {
				in_progress: updatedTodo.in_progress,
				completed: updatedTodo.completed,
				worked_by: updatedTodo.worked_by,
				completed_at: updatedTodo.completed_at,
			});

			setTodos((prev) => prev.map((todo) => (todo.id === currentTodo.id ? response.data : todo)));
		} catch {
			setTodos((prev) => prev.map((todo) => (todo.id === currentTodo.id ? currentTodo : todo)));
			setTodosError("Could not update this todo.");
		} finally {
			setSavingTodoId(null);
		}
	};

	const handleReopenTodo = async () => {
		if (!reopenTodo) {
			return;
		}

		const currentTodo = reopenTodo;
		setReopenTodo(null);
		setSavingTodoId(currentTodo.id);
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === currentTodo.id
					? {
						...todo,
						in_progress: true,
						completed: false,
						completed_at: null,
					}
					: todo,
			),
		);

		try {
			const response = await TodosAPI.reopen(currentTodo.id);
			setTodos((prev) => prev.map((todo) => (todo.id === currentTodo.id ? response.data : todo)));
		} catch {
			setTodos((prev) => prev.map((todo) => (todo.id === currentTodo.id ? currentTodo : todo)));
			setTodosError("Could not reopen this todo.");
		} finally {
			setSavingTodoId(null);
		}
	};

	return (
		<AppShellLayout>
			<section className="p-8 lg:p-6">
				<div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
						{isAdmin ? "Admin task view" : "User task view"}
					</p>
					<p className="mt-2 text-lg text-zinc-600">
						Click a todo once to mark it as in progress, then click it again to mark it done.
					</p>
				</div>

				{todosError ? (
					<div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
						{todosError}
					</div>
				) : null}

				{todosLoading ? (
					<div className="mb-4 rounded-lg bg-white p-6 shadow-sm">Loading todo checklist...</div>
				) : null}

				<TaskDetails
					title={task.title}
					description={task.description ?? "No description provided."}
					priority={`Priority #${task.priority_id}`}
					status={`Status #${task.status_id}`}
					dueDate={task.due_date ?? "No due date"}
					assignees={[]}
					checklist={checklist}
					attachments={[]}
					onChecklistItemToggle={handleToggleTodo}
					onEdit={isAdmin ? () => navigate(`/tasks/${task.id}/edit`) : undefined}
				/>

				{savingTodoId ? (
					<p className="mt-4 text-sm text-zinc-500">Saving todo {savingTodoId}...</p>
				) : null}

				<Modal
					isOpen={Boolean(reopenTodo)}
					title="Reopen todo?"
					onClose={() => setReopenTodo(null)}
					onCancel={() => setReopenTodo(null)}
					onDone={handleReopenTodo}
					cancelText="No"
					doneText="Yes"
				>
					<p className="text-lg text-zinc-700">
						This todo is already completed. Do you want to put it back in progress?
					</p>
				</Modal>
			</section>
		</AppShellLayout>
	);
}