type TasksStatusCardProps = {
	userName?: string;
	dateLabel?: string;
	counts?: {
		pending?: number;
		awaiting?: number;
		inProgress?: number;
		onHold?: number;
		completed?: number;
		cancelled?: number;
	};
};

const statusPillClass = "h-7 w-2.5 rounded-full";

export default function TasksStatusCard({
	userName = "Admin",
	dateLabel = "Tuesday 25th Mar 2026",
	counts,
}: TasksStatusCardProps) {
	const statusItems = [
		{ label: "Pending", count: counts?.pending ?? 0, colorClass: "bg-yellow-500" },
		{ label: "Awaiting", count: counts?.awaiting ?? 0, colorClass: "bg-amber-500" },
		{ label: "In Progress", count: counts?.inProgress ?? 0, colorClass: "bg-blue-500" },
		{ label: "On Hold", count: counts?.onHold ?? 0, colorClass: "bg-gray-500" },
		{ label: "Completed", count: counts?.completed ?? 0, colorClass: "bg-green-600" },
		{ label: "Cancelled", count: counts?.cancelled ?? 0, colorClass: "bg-red-600" },
	];

	return (
		<section className="w-full rounded-3xl border border-[#e7e8ec] bg-[#f5f5f7] p-8 shadow-[0_2px_8px_rgba(15,23,42,0.03)] lg:p-10">
			<h2 className="text-5xl font-semibold leading-tight tracking-tight text-[#131313]">
				Good Morning! {userName}
			</h2>
			<p className="mt-3 text-3xl text-[#7a7a7a]">{dateLabel}</p>

			<div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-10">
				{statusItems.map((status) => (
					<div key={status.label} className="flex items-center gap-4">
						<span className={`${statusPillClass} ${status.colorClass}`} />
						<p className="text-[2.25rem] leading-none text-[#494949]">
							<span className="font-semibold text-[#101010]">{status.count}</span> {status.label}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
