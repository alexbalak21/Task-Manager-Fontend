import { ExternalLink } from 'lucide-react'

type TaskAssignee = {
	id: string
	name: string
	avatarUrl?: string
}

type TaskChecklistItem = {
	id: string
	text: string
	done: boolean
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
	{ id: '1', text: 'Create wireframe', done: true },
	{ id: '2', text: 'Design header with navigation', done: true },
	{ id: '3', text: 'Build hero section with call-to-action', done: false },
	{ id: '4', text: 'Add responsive card layout for services', done: false },
	{ id: '5', text: 'Implement footer with contact details', done: false },
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
}: TaskDetailsProps) {
	return (
		<article className="w-full rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
			<header className="mb-6 flex items-start justify-between gap-4">
				<h2 className="text-4xl font-semibold tracking-[-0.02em] text-zinc-900">{title}</h2>
				<span className="rounded-lg bg-cyan-100 px-4 py-2 text-lg font-semibold text-cyan-700">
					{status}
				</span>
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

			<section className="mb-8">
				<h3 className="mb-4 text-2xl font-semibold text-zinc-700">Todo Checklist</h3>
				<ul className="space-y-5">
					{checklist.map(item => (
						<li key={item.id} className="flex items-center gap-4 text-3xl text-zinc-900">
							<input
								type="checkbox"
								checked={item.done}
								readOnly
								className="h-7 w-7 rounded border-zinc-300 accent-blue-600"
								aria-label={item.text}
							/>
							<span>{item.text}</span>
						</li>
					))}
				</ul>
			</section>

			<section>
				<h3 className="mb-4 text-2xl font-semibold text-zinc-700">Attachments</h3>
				<ul className="space-y-3">
					{attachments.map((attachment, index) => (
						<li
							key={attachment.id}
							className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4"
						>
							<div className="flex min-w-0 items-center gap-5">
								<span className="w-8 text-xl font-semibold text-zinc-400">{String(index + 1).padStart(2, '0')}</span>
								<a
									href={attachment.url}
									target="_blank"
									rel="noreferrer"
									className="truncate text-2xl font-medium text-zinc-900 hover:text-blue-700"
								>
									{attachment.url}
								</a>
							</div>
							<a
								href={attachment.url}
								target="_blank"
								rel="noreferrer"
								aria-label={`Open attachment ${index + 1}`}
								className="text-zinc-400 transition-colors hover:text-zinc-700"
							>
								<ExternalLink size={26} />
							</a>
						</li>
					))}
				</ul>
			</section>
		</article>
	)
}
