import { FileText } from "lucide-react";
import AppShellLayout from "../../../layouts/AppShellLayout";
import TaskCard from "../../Tasks/components/TaskCard";
import { useEffect } from "react";
import { useUsersStore } from "../../Users/state/users.store";

type TaskStatus = "in-progress" | "pending";
type TaskPriority = "high" | "medium" | "low";

type ManageTask = {
	id: string;
	title: string;
	description: string;
	status: TaskStatus;
	priority: TaskPriority;
	completedTasks: number;
	totalTasks: number;
	startDate: string;
	dueDate: string;
	assignees: string[];
	attachmentsCount?: number;
};

const FILTERS = [
	{ label: "All", count: 18, active: true },
	{ label: "Pending", count: 11 },
	{ label: "In Progress", count: 5 },
	{ label: "Completed", count: 2 },
];

const TASKS: ManageTask[] = [
	{
		id: "task-1",
		title: "Design Homepage",
		description:
			"Create a clean and modern homepage layout using Tailwind CSS. Ensure the design is responsive and accessible.",
		status: "in-progress",
		priority: "high",
		completedTasks: 2,
		totalTasks: 5,
		startDate: "16th Mar 2025",
		dueDate: "31st Mar 2025",
		assignees: ["SR", "MK", "AL"],
		attachmentsCount: 2,
	},
	{
		id: "task-2",
		title: "Write Blog Post",
		description:
			"Write an informative blog post about React performance optimization. Cover memoization, lazy loading, and rendering patterns.",
		status: "in-progress",
		priority: "medium",
		completedTasks: 2,
		totalTasks: 5,
		startDate: "16th Mar 2025",
		dueDate: "27th Mar 2025",
		assignees: ["LN", "RM", "JO"],
		attachmentsCount: 1,
	},
	{
		id: "task-3",
		title: "API Integration for Dashboard",
		description:
			"Implement API integration for the user dashboard. Ensure data fetching is efficient and includes proper error handling.",
		status: "pending",
		priority: "high",
		completedTasks: 0,
		totalTasks: 5,
		startDate: "16th Mar 2025",
		dueDate: "5th Apr 2025",
		assignees: ["KT", "AM", "DP"],
	},
	{
		id: "task-4",
		title: "Product Catalog Update",
		description:
			"Update the product catalog with new categories and revised listings. Ensure descriptions are concise yet informative.",
		status: "pending",
		priority: "low",
		completedTasks: 0,
		totalTasks: 5,
		startDate: "16th Mar 2025",
		dueDate: "8th Apr 2025",
		assignees: ["AE", "PD"],
	},
	{
		id: "task-5",
		title: "Social Media Campaign",
		description:
			"Develop a content plan for the upcoming product launch. Create visually appealing designs and posting schedules.",
		status: "pending",
		priority: "medium",
		completedTasks: 0,
		totalTasks: 3,
		startDate: "16th Mar 2025",
		dueDate: "12th Apr 2025",
		assignees: ["RX"],
	},
	{
		id: "task-6",
		title: "Develop Authentication System",
		description:
			"Implement secure authentication for the platform. Include user registration, login, and session management.",
		status: "pending",
		priority: "high",
		completedTasks: 0,
		totalTasks: 5,
		startDate: "16th Mar 2025",
		dueDate: "30th Apr 2025",
		assignees: ["TY", "MS"],
	},
];


export default function ManageTasksPage() {
	const { users, loadUsers, loading, error } = useUsersStore();

	useEffect(() => {
		loadUsers();
	}, [loadUsers]);

	return (
		<AppShellLayout>
			<section className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
				<div className="mb-6 flex flex-wrap items-center justify-between gap-4">
					<h2 className="text-4xl font-semibold tracking-tight text-[#111827]">My Tasks</h2>

					<div className="flex flex-wrap items-center gap-6">
						<nav className="flex items-center gap-4 text-lg text-gray-600" aria-label="Task filters">
							{FILTERS.map((filter) => (
								<button
									key={filter.label}
									type="button"
									className={[
										"inline-flex items-center gap-3 border-b-2 pb-2 font-medium transition-colors",
										filter.active
											? "border-primary-500 text-primary-500"
											: "border-transparent text-gray-600 hover:text-gray-800",
									].join(" ")}
								>
									<span>{filter.label}</span>
									<span
										className={[
											"inline-flex min-w-7 items-center justify-center rounded-full px-2 py-0.5 text-sm font-semibold",
											filter.active ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-500",
										].join(" ")}
									>
										{filter.count}
									</span>
								</button>
							))}
						</nav>

						<button
							type="button"
							className="inline-flex items-center gap-2 rounded-lg bg-lime-100 px-4 py-3 text-lg font-medium text-[#42541e] transition-colors hover:bg-lime-200"
						>
							<FileText className="h-5 w-5" strokeWidth={2} />
							<span>Download Report</span>
						</button>
					</div>
				</div>

				<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
					{TASKS.map((task) => (
						<TaskCard
							key={task.id}
							title={task.title}
							description={task.description}
							statusLabel={task.status === "in-progress" ? "In Progress" : task.status === "pending" ? "Pending" : "Completed"}
							priorityLabel={
								task.priority === "high"
									? "High Priority"
									: task.priority === "medium"
									? "Medium Priority"
									: "Low Priority"
							}
							totalTasks={task.totalTasks}
							completedTasks={task.completedTasks}
							startDate={task.startDate}
							dueDate={task.dueDate}
							attachmentsCount={task.attachmentsCount}
							assignees={task.assignees}
						/>
					))}
				</div>
			</section>
		</AppShellLayout>
	);
}