import TaskChecklist from './TaskChecklist'
import TaskAttachments from './TaskAttachments'

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
	assignees?: TaskAssignee[]
	checklist?: TaskChecklistItem[]
	attachments?: TaskAttachment[]
	onChecklistItemToggle?: (id: string) => void
	onEdit?: () => void
}

const DEFAULT_ASSIGNEES: TaskAssignee[] = [
	{
		id: '1',
		name: 'Nina Patel',
		avatarUrl:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
	},
	{
		id: '2',
		name: 'Samuel Reed',
		avatarUrl:
			'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
	},
	{
		id: '3',
		name: 'Ava Brooks',
		avatarUrl:
			'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80',
	},
]

const DEFAULT_CHECKLIST: TaskChecklistItem[] = [
	{ id: '1', text: 'Create wireframe', state: 'completed' },
	{ id: '2', text: 'Design header with navigation', state: 'completed' },
	{ id: '3', text: 'Build hero section with call-to-action', state: 'in_progress' },
	{ id: '4', text: 'Add responsive card layout for services', state: 'pending' },
	{ id: '5', text: 'Implement footer with contact details', state: 'pending' },
]

const DEFAULT_ATTACHMENTS: TaskAttachment[] = [
	{ id: '1', url: 'https://react.dev/' },
	{ id: '2', url: 'https://tailwindcss.com/docs/background-image' },
]

function getInitials(name: string): string {
	const parts = name.trim().split(/\s+/)
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
	return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
}

export default function TaskDetails({
	title = 'Design Homepage',
	description =
		'Create a clean and modern homepage layout using Tailwind CSS. Ensure the design is responsive and optimized for mobile devices. Focus on intuitive navigation and clear CTAs. Incorporate brand colors and typography guidelines',
	priority = 'High',
	dueDate = '31st Mar 2025',
	status = 'In Progress',
	assignees = DEFAULT_ASSIGNEES,
	checklist = DEFAULT_CHECKLIST,
	attachments = DEFAULT_ATTACHMENTS,
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
					<span className="rounded-lg bg-cyan-100 px-4 py-2 text-lg font-semibold text-cyan-700">
						{status}
					</span>
				</div>
			</header>

			<section className="mb-8">
				<h3 className="mb-2 text-xl font-semibold text-zinc-600">Description</h3>
				<p className="max-w-[100ch] text-[1.95rem] leading-relaxed text-zinc-800 sm:text-3xl">
					{description}
				</p>
			</section>

			<section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
				<div>
					<h3 className="mb-1 text-xl font-semibold text-zinc-600">Priority</h3>
					<p className="text-3xl font-semibold text-zinc-900">{priority}</p>
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
