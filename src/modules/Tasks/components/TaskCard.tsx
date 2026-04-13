import { Paperclip } from "lucide-react";

type TaskCardProps = {
	title?: string;
	description?: string;
	statusLabel?: string;
	priorityLabel?: string;
	totalTasks?: number;
	completedTasks?: number;
	startDate?: string;
	dueDate?: string;
	attachmentsCount?: number;
	assignees?: string[];
};

const DEFAULT_ASSIGNEES = ["AL", "RM", "JO"];

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
	priorityLabel = "High Priority",
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
			className="w-full max-w-xl rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_12px_26px_-16px_rgba(15,23,42,0.35)] sm:p-6"
			aria-label="Task Card"
		>
			<header className="mb-4 flex flex-wrap items-center gap-3">
				<span className="rounded-lg bg-[#dff5f7] px-4 py-1.5 text-base font-semibold text-[#1e8ba0]">
					{statusLabel}
				</span>
				<span className="rounded-lg bg-[#f8dbe4] px-4 py-1.5 text-base font-semibold text-[#be4a75]">
					{priorityLabel}
				</span>
			</header>

			<div className="relative border-l-4 border-[#22b3cb] pl-4">
				<h3 className="text-2xl leading-relaxed font-semibold tracking-[-0.02em] text-[#1f2738]">
					{title}
				</h3>

				<p className="mt-2 max-w-[48ch] text-xl leading text-[#697487]">
					{description}
				</p>

				<p className="mt-4 text-lg font-semibold text-[#212938]">
					Task Done: {completedTasks} / {totalTasks}
				</p>

				<div
					className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-[#e3e7ef]"
					role="progressbar"
					aria-valuemin={0}
					aria-valuemax={totalTasks}
					aria-valuenow={Math.min(completedTasks, totalTasks)}
					aria-valuetext={`${progress}% complete`}
				>
					<div
						className="h-full rounded-full bg-[#1fb8d4] transition-[width] duration-300 ease-out"
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
					{assignees.map((name, index) => (
						<span
							key={`${name}-${index}`}
							className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-slate-500 to-slate-700 text-sm font-semibold text-white shadow-[0_2px_6px_rgba(2,6,23,0.25)]"
							style={{ marginLeft: index === 0 ? 0 : -10, zIndex: assignees.length - index }}
							aria-label={`Assignee ${name}`}
						>
							{name}
						</span>
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
