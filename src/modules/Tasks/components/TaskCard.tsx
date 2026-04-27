import { Paperclip } from "lucide-react";
import Avatar from "../../Users/components/Avatar";
import PriorityChip from "../../TaskCard/components/PriorityChip";
import StatusChip from "../../TaskCard/components/StatusChip";


export type TaskCardProps = {
	id?: number;
	title?: string;
	description?: string;
	statusLabel?: string;
	statusColor?: string;
	priorityLabel?: string;
	priorityColor?: string;
	totalTasks?: number;
	completedTasks?: number;
	startDate?: string;
	dueDate?: string;
	attachmentsCount?: number;
	assignees?: { name: string; profile_image: string }[];
};


const DEFAULT_ASSIGNEES: { name: string; profile_image: string }[] = [];

function toPercent(done: number, total: number): number {
	if (total <= 0) {
		return 0;
	}

	return Math.max(0, Math.min(100, Math.round((done / total) * 100)));
}


export default function TaskCard({
	title = "Design Homepage",
	description = "Create a clean and modern homepage layout using Tailwind CSS. Ensure the design is responsive and accessible for all devices.",
	statusLabel = "In Progress",
	statusColor = "#0D9488",
	priorityLabel = "High Priority",
	priorityColor = "#64748B",
	totalTasks = 10,
	completedTasks = 2,
	startDate = "16th Mar 2025",
	dueDate = "31st Mar 2025",
	attachmentsCount = 2,
	assignees = DEFAULT_ASSIGNEES,
}: TaskCardProps) {
	const progress = toPercent(completedTasks, totalTasks);

	return (
		<article
			className="w-full max-w-xl rounded-3xl border border-slate-100 bg-white p-5 shadow-xl sm:p-6"
			aria-label="Task Card"
		>
			<header className="mb-4 flex flex-wrap items-center gap-3">
				<StatusChip name={statusLabel} color={statusColor} />


				<PriorityChip name={priorityLabel} color={priorityColor} />
			</header>

			<div className="relative border-l-4 border-cyan-500 pl-4">
				<h3 className="text-2xl leading-relaxed font-semibold tracking-[-0.02em] text-slate-800">
					{title}
				</h3>

				<p className="mt-3 max-w-[48ch] text-lg leading text-slate-500">
					{description}
				</p>

				<p className="mt-4 text-lg font-semibold text-slate-700">
					Task Done: {completedTasks} / {totalTasks}
				</p>

				<div
					className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-200"
					role="progressbar"
					aria-valuemin={0}
					aria-valuemax={totalTasks}
					aria-valuenow={Math.min(completedTasks, totalTasks)}
					aria-valuetext={`${progress}% complete`}
				>
					<div
						className="h-full rounded-full bg-cyan-500 transition-[width] duration-300 ease-out"
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>

			<section className="mt-5 flex items-start justify-between gap-4">
				<div>
					<p className="text-lg text-gray-500">Start Date</p>
					<p className="mt-1 text-xl leading-tight font-semibold text-gray-800">
						{startDate}
					</p>
				</div>

				<div className="text-right">
					<p className="text-lg text-gray-500">Due Date</p>
					<p className="mt-1 text-xl leading-tight font-semibold text-gray-800">
						{dueDate}
					</p>
				</div>
			</section>

			<footer className="mt-5 flex items-center justify-between">
				<div className="flex items-center">
					{assignees.map((assignee, index) => (
						<Avatar
							key={index}
							name={assignee.name}
							profile_image={assignee.profile_image}
							size={40}
						/>
					))}
				</div>

				<span className="inline-flex items-center gap-2 rounded-xl bg-[#eef2ff] px-3 py-2 text-[#5065c8]">
					<Paperclip size={18} strokeWidth={2.2} />
					<strong className="text-lg leading-none">{attachmentsCount}</strong>
				</span>
			</footer>
		</article>
	);
}
