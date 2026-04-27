import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import PriorityChip from "../../TaskCard/components/PriorityChip";
import StatusChip from "../../TaskCard/components/StatusChip";
import { usePriorityStore } from "../../Priority/store/priority.store";
import { useStatusStore } from "../state/status.store";
import { useTasksStore } from "../state/tasks.store";

type TaskListRow = {
	id: number;
	title: string;
	status_id: number;
	priority_id: number;
	created_at: string | null;
};

type TaskListTableProps = {
	title?: string;
	rows?: TaskListRow[];
	onSeeAll?: () => void;
};

const DEFAULT_ROWS: TaskListRow[] = [];

function formatTaskDate(createdAt: string | null) {
	if (!createdAt) {
		return "—";
	}

	const parsedDate = new Date(createdAt);

	if (Number.isNaN(parsedDate.getTime())) {
		return createdAt;
	}

	return new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(parsedDate);
}

export default function TaskListTable({
	title = "Recent Tasks",
	rows = DEFAULT_ROWS,
	onSeeAll,
}: TaskListTableProps) {
	const tasks = useTasksStore((state) => state.tasks);
	const statuses = useStatusStore((state) => state.statuses);
	const priorities = usePriorityStore((state) => state.priorities);

	const visibleRows = useMemo(() => {
		const sourceRows = rows.length > 0 ? rows : tasks;

		const statusLookup = new Map(statuses.map((status) => [status.id, status]));
		const priorityLookup = new Map(priorities.map((priority) => [priority.id, priority]));

		return sourceRows.map((row) => {
			const status = statusLookup.get(row.status_id);
			const priority = priorityLookup.get(row.priority_id);

			return {
				key: row.id,
				name: row.title,
				statusName: status?.name ?? `Status ${row.status_id}`,
				statusColor: status?.color ?? "#0D9488",
				priorityName: priority?.name ?? `Priority ${row.priority_id}`,
				priorityColor: priority?.color ?? "#64748B",
				createdOn: formatTaskDate(row.created_at),
			};
		});
	}, [priorities, rows, statuses, tasks]);

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
						{visibleRows.map((row) => (
							<tr key={row.key} className="border-b border-zinc-200 last:border-b-0 text-[18px] text-[#3a3a3a]">
								<td className="py-5 pl-4 pr-6">{row.name}</td>
								<td className="px-6 py-5">
									<StatusChip name={row.statusName} color={row.statusColor} />
								</td>
								<td className="px-6 py-5">
									<PriorityChip name={row.priorityName} color={row.priorityColor} />
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
