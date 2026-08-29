import TaskChecklist from './TaskChecklist'
import TaskAttachments from './TaskAttachments'
import StatusChip from '../../TaskCard/components/StatusChip'
import PriorityChip from '../../TaskCard/components/PriorityChip'

type TaskAssignee = {
	id: string
	name: string
	avatarUrl?: string
}

type TaskChecklistItem = {
	id: string
	text: string
	state: 'pending' | 'in_progress' | 'completed'
}

type TaskAttachment = {
	id: string
	url: string
}

type TaskDetailsProps = {
	title?: string
	description?: string
	priority?: string
	dueDate?: string
	status?: string
	statusColor?: string
	assignees?: TaskAssignee[]
	checklist?: TaskChecklistItem[]
	attachments?: TaskAttachment[]
	onChecklistItemToggle?: (id: string) => void
	onEdit?: () => void
}

// Dummy data removed — component now uses empty defaults

function getInitials(name: string): string {
	const parts = name.trim().split(/\s+/)
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
	return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
}

export default function TaskDetails({
	title = '',
	description = '',
	priority = '',
	dueDate = '',
	status = '',
	statusColor,
	assignees = [],
	checklist = [],
	attachments = [],
	onChecklistItemToggle,
	onEdit,
}: TaskDetailsProps) {
	return (
		<article className="w-full rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
			<header className="mb-6 flex items-start justify-between gap-4">
				<div>
					<h2 className="text-4xl font-semibold tracking-[-0.02em] text-zinc-900">{title}</h2>
				</div>
				<div className="flex items-center gap-3">
					{onEdit ? (
						<button
							type="button"
							onClick={onEdit}
							className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-base font-semibold text-zinc-800 transition-colors hover:bg-zinc-100"
						>
							Edit Task
						</button>
					) : null}
					<StatusChip name={status} color={statusColor} />
				</div>
			</header>

			<section className="mb-8">
				<h3 className="mb-2 text-xl font-semibold text-zinc-600">Description</h3>
				<p className="max-w-[100ch] text-lg leading-relaxed text-zinc-800 border border-zinc-200 rounded-lg p-4 h-52	">
					{description}
				</p>
			</section>

			<section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
				<div>
					<h3 className="mb-1 text-xl font-semibold text-zinc-600">Priority</h3>
					<PriorityChip name={priority} />
				</div>
				<div>
					<h3 className="mb-1 text-xl font-semibold text-zinc-600">Due Date</h3>
					<p className="text-3xl font-semibold text-zinc-900">{dueDate}</p>
				</div>
				<div>
					<h3 className="mb-2 text-xl font-semibold text-zinc-600">Assigned To</h3>
					<div className="flex items-center">
						{assignees.map((assignee, index) => (
							<span
								key={assignee.id}
								className="relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-zinc-300 text-sm font-semibold text-zinc-700"
								style={{ marginLeft: index === 0 ? 0 : -10, zIndex: assignees.length - index }}
								title={assignee.name}
							>
								{assignee.avatarUrl ? (
									<img
										src={assignee.avatarUrl}
										alt={assignee.name}
										className="h-full w-full object-cover"
										loading="lazy"
									/>
								) : (
									getInitials(assignee.name)
								)}
							</span>
						))}
					</div>
				</div>
			</section>

			<TaskChecklist checklist={checklist} onToggle={onChecklistItemToggle} />

			<TaskAttachments attachments={attachments} />
		</article>
	)
}
