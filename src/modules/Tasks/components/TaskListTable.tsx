import { ArrowRight } from "lucide-react";

type TaskStatus = "pending" | "completed" | "in progress";
type TaskPriority = "low" | "medium" | "high";

type TaskListRow = {
	name: string;
	status: TaskStatus;
	priority: TaskPriority;
	createdOn: string;
};

type TaskListTableProps = {
	title?: string;
	rows?: TaskListRow[];
	onSeeAll?: () => void;
};

const DEFAULT_ROWS: TaskListRow[] = [
	{ name: "Develop Product Review System", status: "pending", priority: "low", createdOn: "17th Mar 2025" },
	{ name: "Build Feedback Form Module", status: "pending", priority: "high", createdOn: "17th Mar 2025" },
	{ name: "Implement Notification System", status: "pending", priority: "low", createdOn: "17th Mar 2025" },
	{ name: "Migrate Database to MongoDB Atlas", status: "completed", priority: "medium", createdOn: "17th Mar 2025" },
	{ name: "Develop Expense Tracker Module", status: "pending", priority: "low", createdOn: "17th Mar 2025" },
	{ name: "Design Homepage Banner", status: "pending", priority: "medium", createdOn: "17th Mar 2025" },
	{ name: "Write Technical Documentation", status: "pending", priority: "medium", createdOn: "17th Mar 2025" },
	{ name: "Develop User Authentication System", status: "in progress", priority: "high", createdOn: "17th Mar 2025" },
];

function statusStyle(status: TaskStatus) {
	if (status === "completed") {
		return "bg-emerald-100 text-emerald-600 border-emerald-200";
	}

	if (status === "in progress") {
		return "bg-cyan-100 text-cyan-600 border-cyan-200";
	}

	return "bg-violet-100 text-violet-600 border-violet-200";
}

function priorityStyle(priority: TaskPriority) {
	if (priority === "low") {
		return "bg-emerald-100 text-emerald-600 border-emerald-200";
	}

	if (priority === "high") {
		return "bg-rose-100 text-rose-600 border-rose-200";
	}

	return "bg-amber-100 text-amber-600 border-amber-200";
}

function formatStatus(status: TaskStatus) {
	if (status === "in progress") {
		return "In Progress";
	}

	return status.charAt(0).toUpperCase() + status.slice(1);
}

function formatPriority(priority: TaskPriority) {
	return priority.charAt(0).toUpperCase() + priority.slice(1);
}

export default function TaskListTable({
	title = "Recent Tasks",
	rows = DEFAULT_ROWS,
	onSeeAll,
}: TaskListTableProps) {
	return (
		<section className="w-full rounded-[28px] border border-zinc-100 bg-white p-5 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.45)] sm:p-6">
			<header className="mb-6 flex items-center justify-between gap-4">
				<h2 className="text-3xl font-medium tracking-tight text-[#171717]">{title}</h2>

				<button
					type="button"
					onClick={onSeeAll}
					className="inline-flex items-center gap-3 rounded-xl border border-zinc-200 bg-[#fafafa] px-5 py-3 text-lg font-semibold text-[#4b4b4b] shadow-[0_1px_0_rgba(15,23,42,0.02)] transition-colors hover:bg-[#f3f4f6]"
				>
					<span>See All</span>
					<ArrowRight className="h-5 w-5" strokeWidth={2.2} />
				</button>
			</header>

			<div className="overflow-x-auto">
				<table className="min-w-225 w-full border-collapse text-left">
					<thead>
						<tr className="border-b border-zinc-200 text-[19px] font-semibold text-[#2c2c2c]">
							<th className="pb-4 pl-4 pr-6">Name</th>
							<th className="pb-4 px-6">Status</th>
							<th className="pb-4 px-6">Priority</th>
							<th className="pb-4 px-6">Created On</th>
						</tr>
					</thead>

					<tbody>
						{rows.map((row) => (
							<tr key={`${row.name}-${row.createdOn}`} className="border-b border-zinc-200 last:border-b-0 text-[18px] text-[#3a3a3a]">
								<td className="py-5 pl-4 pr-6">{row.name}</td>
								<td className="px-6 py-5">
									<span className={`inline-flex rounded-md border px-3 py-1.5 text-base font-medium ${statusStyle(row.status)}`}>
										{formatStatus(row.status)}
									</span>
								</td>
								<td className="px-6 py-5">
									<span className={`inline-flex rounded-md border px-3 py-1.5 text-base font-medium ${priorityStyle(row.priority)}`}>
										{formatPriority(row.priority)}
									</span>
								</td>
								<td className="px-6 py-5 text-[#4a4a4a]">{row.createdOn}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
