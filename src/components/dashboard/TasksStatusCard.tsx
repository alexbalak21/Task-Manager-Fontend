type TasksStatusCardProps = {
	userName?: string;
	dateLabel?: string;
	statusesToShow?: StatusKey[];
	counts?: {
		pending?: number;
		awaiting?: number;
		inProgress?: number;
		onHold?: number;
		completed?: number;
		cancelled?: number;
	};
};

type StatusKey = "pending" | "awaiting" | "inProgress" | "onHold" | "completed" | "cancelled";

const STATUS_META: Record<StatusKey, { label: string; colorClass: string }> = {
	pending: { label: "Pending", colorClass: "bg-yellow-500" },
	awaiting: { label: "Awaiting", colorClass: "bg-amber-500" },
	inProgress: { label: "In Progress", colorClass: "bg-blue-500" },
	onHold: { label: "On Hold", colorClass: "bg-gray-500" },
	completed: { label: "Completed", colorClass: "bg-green-600" },
	cancelled: { label: "Cancelled", colorClass: "bg-red-600" },
};

const DEFAULT_RELEVANT_STATUSES: StatusKey[] = ["pending", "awaiting", "inProgress", "completed"];

const statusPillClass = "h-6 w-2 rounded-full";

function getOrdinalSuffix(day: number) {
	if (day >= 11 && day <= 13) {
		return "th";
	}

	switch (day % 10) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
}

function formatTodayLabel() {
	const now = new Date();
	const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(now);
	const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(now);
	const day = now.getDate();
	const year = now.getFullYear();

	return `${weekday} ${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

function getTimeGreeting() {
	const hour = new Date().getHours();

	if (hour < 12) {
		return "Good Morning";
	}

	if (hour < 18) {
		return "Good Afternoon";
	}

	return "Good Evening";
}

export default function TasksStatusCard({
	userName = "Admin",
	dateLabel = formatTodayLabel(),
	statusesToShow = DEFAULT_RELEVANT_STATUSES,
	counts,
}: TasksStatusCardProps) {
	const countsByStatus: Record<StatusKey, number> = {
		pending: counts?.pending ?? 0,
		awaiting: counts?.awaiting ?? 0,
		inProgress: counts?.inProgress ?? 0,
		onHold: counts?.onHold ?? 0,
		completed: counts?.completed ?? 0,
		cancelled: counts?.cancelled ?? 0,
	};

	const statusItems = statusesToShow.map((key) => ({
		label: STATUS_META[key].label,
		colorClass: STATUS_META[key].colorClass,
		count: countsByStatus[key],
	}));

	return (
		<section className="w-full rounded-3xl border border-zinc-100 bg-white p-8 shadow-[0_2px_8px_rgba(15,23,42,0.03)] lg:p-10">
			<h2 className="text-4xl font-semibold leading-tight tracking-tight text-black">
				{getTimeGreeting()}! {userName}
			</h2>
			<p className="mt-2 text-2xl text-gray-500">{dateLabel}</p>

			<div className="mt-9 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-10">
				{statusItems.map((status) => (
					<div key={status.label} className="flex items-center gap-3">
						<span className={`${statusPillClass} ${status.colorClass}`} />
						<p className="text-2xl leading-none text-[#494949]">
							<span className="font-semibold text-[#101010]">{status.count}</span> {status.label}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
