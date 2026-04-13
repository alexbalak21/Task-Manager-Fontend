import { FileText, Paperclip } from "lucide-react";
import AppShellLayout from "../../../layouts/AppShellLayout";

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

const avatarBackgrounds = [
	"bg-linear-to-br from-slate-600 to-slate-900",
	"bg-linear-to-br from-cyan-600 to-blue-900",
	"bg-linear-to-br from-rose-500 to-orange-600",
	"bg-linear-to-br from-indigo-500 to-purple-700",
];

function progressWidth(completedTasks: number, totalTasks: number) {
	if (totalTasks <= 0) {
		return 0;
	}

	return Math.min(100, Math.max(0, Math.round((completedTasks / totalTasks) * 100)));
}

function statusStyles(status: TaskStatus) {
	if (status === "in-progress") {
		return {
			badgeClass: "bg-cyan-100 text-cyan-700",
			text: "In Progress",
			accentClass: "border-cyan-500",
			progressClass: "bg-cyan-500",
		};
	}

	return {
		badgeClass: "bg-violet-100 text-violet-700",
		text: "Pending",
		accentClass: "border-violet-500",
		progressClass: "bg-violet-500",
	};
}

function priorityStyles(priority: TaskPriority) {
	if (priority === "high") {
		return { badgeClass: "bg-rose-100 text-rose-700", text: "High Priority" };
	}

	if (priority === "medium") {
		return { badgeClass: "bg-amber-100 text-amber-700", text: "Medium Priority" };
	}

	return { badgeClass: "bg-emerald-100 text-emerald-700", text: "Low Priority" };
}

export default function ManageTasksPage() {
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
					{TASKS.map((task) => {
						const status = statusStyles(task.status);
						const priority = priorityStyles(task.priority);
						const completionPercent = progressWidth(task.completedTasks, task.totalTasks);

						return (
							<article
								key={task.id}
								className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.55)]"
							>
								<header className="mb-4 flex items-center gap-3">
									<span
										className={`rounded-lg px-3 py-1 text-base font-semibold ${status.badgeClass}`}
									>
										{status.text}
									</span>
									<span
										className={`rounded-lg px-3 py-1 text-base font-semibold ${priority.badgeClass}`}
									>
										{priority.text}
									</span>
								</header>

								<div className={`border-l-4 ${status.accentClass} pl-3`}>
									<h3 className="text-4xl font-semibold leading-tight text-[#202020]">{task.title}</h3>
									<p className="mt-2 line-clamp-2 text-xl text-[#4b5563]">{task.description}</p>
									<p className="mt-3 text-xl font-semibold text-[#2f2f2f]">
										Task Done: {task.completedTasks} / {task.totalTasks}
									</p>

									<div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
										<div
											className={`h-full rounded-full transition-[width] duration-300 ${status.progressClass}`}
											style={{ width: `${completionPercent}%` }}
										/>
									</div>
								</div>

								<section className="mt-4 flex items-start justify-between gap-3">
									<div>
										<p className="text-lg text-gray-500">Start Date</p>
										<p className="mt-1 text-2xl font-semibold leading-tight text-gray-800">{task.startDate}</p>
									</div>
									<div className="text-right">
										<p className="text-lg text-gray-500">Due Date</p>
										<p className="mt-1 text-2xl font-semibold leading-tight text-gray-800">{task.dueDate}</p>
									</div>
								</section>

								<footer className="mt-4 flex items-center justify-between">
									<div className="flex items-center">
										{task.assignees.map((assignee, index) => (
											<span
												key={`${task.id}-${assignee}-${index}`}
												className={[
													"inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-white text-sm font-semibold text-white",
													avatarBackgrounds[index % avatarBackgrounds.length],
												].join(" ")}
												style={{ marginLeft: index === 0 ? 0 : -10, zIndex: task.assignees.length - index }}
											>
												{assignee}
											</span>
										))}
									</div>

									{task.attachmentsCount ? (
										<span className="inline-flex items-center gap-2 rounded-xl bg-[#edf1ff] px-3 py-2 text-[#4060c3]">
											<Paperclip size={17} strokeWidth={2.2} />
											<strong className="text-lg leading-none">{task.attachmentsCount}</strong>
										</span>
									) : (
										<span className="h-10 w-10" aria-hidden="true" />
									)}
								</footer>
							</article>
						);
					})}
				</div>
			</section>
		</AppShellLayout>
	);
}
