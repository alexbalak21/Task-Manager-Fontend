import { useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from 'react'
import { Paperclip, Plus, Trash2, Users } from 'lucide-react'
import SelectUsersModal, { type SelectableUser } from '../../Users/components/SelectUsersModal'

interface TodoItem {
	id: string
	text: string
}

interface AssignedMember {
	id: string
	name: string
}

export default function UpdateTaskForm() {
	const [formData, setFormData] = useState({
		title: 'Create App UI',
		description: 'Describe task',
		priority: 'Low',
		dueDate: '',
	})

	const [todoItems, setTodoItems] = useState<TodoItem[]>([])
	const [todoInput, setTodoInput] = useState('')
	const [assignedMembers, setAssignedMembers] = useState<AssignedMember[]>([])
	const [attachments, setAttachments] = useState<string[]>([])
	const [isMembersModalOpen, setIsMembersModalOpen] = useState(false)

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleAddTodo = () => {
		const value = todoInput.trim()
		if (!value) return

		setTodoItems(prev => [
			...prev,
			{
				id: Date.now().toString(),
				text: value,
			},
		])
		setTodoInput('')
	}

	const handleTodoKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter') return
		e.preventDefault()
		handleAddTodo()
	}

	const handleRemoveTodo = (id: string) => {
		setTodoItems(prev => prev.filter(item => item.id !== id))
	}

	const handleAddAttachment = () => {
		const link = prompt('Enter file link:')
		if (link) {
			setAttachments(prev => [...prev, link])
		}
	}

	const handleRemoveAttachment = (index: number) => {
		setAttachments(prev => prev.filter((_, i) => i !== index))
	}

	const handleDelete = () => {
		const isConfirmed = confirm('Are you sure you want to delete this task?')
		if (!isConfirmed) return
		// TODO: Connect delete action to API
		console.log('Delete task')
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		console.log({
			formData,
			todoItems,
			assignedMembers,
			attachments,
		})
		// TODO: Connect update action to API
	}

	return (
		<div className="mx-auto max-w-5xl rounded-lg border border-zinc-200 bg-white p-8 shadow-sm">
			<div className="mb-8 flex items-center justify-between gap-4">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Update Task</h1>
				<button
					type="button"
					onClick={handleDelete}
					className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
				>
					<Trash2 size={16} />
					Delete
				</button>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">Task Title</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleInputChange}
						placeholder="Create App UI"
						className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
					/>
				</div>

				<div>
					<label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">Description</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleInputChange}
						placeholder="Describe task"
						rows={5}
						className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
					/>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					<div>
						<label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">Priority</label>
						<select
							name="priority"
							value={formData.priority}
							onChange={handleInputChange}
							className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
						>
							<option>Low</option>
							<option>Medium</option>
							<option>High</option>
							<option>Urgent</option>
						</select>
					</div>

					<div>
						<label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">Due Date</label>
						<input
							type="date"
							name="dueDate"
							value={formData.dueDate}
							onChange={handleInputChange}
							className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
						/>
					</div>

					<div>
						<label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">Assign To</label>
						<button
							type="button"
							onClick={() => setIsMembersModalOpen(true)}
							className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-zinc-100 py-2.5 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
						>
							<Users size={16} />
							Add Members
						</button>
						{assignedMembers.length > 0 && (
							<div className="mt-2 flex flex-wrap gap-2">
								{assignedMembers.map(member => (
									<span
										key={member.id}
										className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-200"
									>
										{member.name}
										<button
											type="button"
											onClick={() =>
												setAssignedMembers(prev =>
													prev.filter(m => m.id !== member.id),
												)
											}
											className="font-bold hover:text-blue-900 dark:hover:text-blue-100"
										>
											x
										</button>
									</span>
								))}
							</div>
						)}
					</div>
				</div>

				<div>
					<label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">TODO Checklist</label>
					<div className="flex gap-2">
						<input
							type="text"
							value={todoInput}
							onChange={e => setTodoInput(e.target.value)}
							onKeyDown={handleTodoKeyDown}
							placeholder="Enter Task"
							className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
						/>
						<button
							type="button"
							onClick={handleAddTodo}
							className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-5 font-semibold text-gray-700 transition-colors hover:bg-zinc-200"
						>
							<Plus size={18} />
							Add
						</button>
					</div>
					{todoItems.length > 0 && (
						<div className="mt-3 space-y-2">
							{todoItems.map(item => (
								<div
									key={item.id}
									className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700"
								>
									<span className="text-sm text-gray-700 dark:text-gray-200">{item.text}</span>
									<button
										type="button"
										onClick={() => handleRemoveTodo(item.id)}
										className="text-red-500 hover:text-red-700"
									>
										x
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				<div>
					<label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">Add Attachments</label>
					<div className="flex gap-2">
						<div className="relative flex-1">
							<Paperclip
								size={16}
								className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
							/>
							<input
								type="text"
								placeholder="Add File Link"
								disabled
								className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-11 pr-4 text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
							/>
						</div>
						<button
							type="button"
							onClick={handleAddAttachment}
							className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-5 font-semibold text-gray-700 transition-colors hover:bg-zinc-200"
						>
							<Plus size={18} />
							Add
						</button>
					</div>
					{attachments.length > 0 && (
						<div className="mt-3 space-y-2">
							{attachments.map((attachment, index) => (
								<div
									key={index}
									className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700"
								>
									<div className="flex min-w-0 items-center gap-2">
										<Paperclip size={16} className="text-gray-600 dark:text-gray-400" />
										<span className="truncate text-sm text-gray-700 dark:text-gray-200">{attachment}</span>
									</div>
									<button
										type="button"
										onClick={() => handleRemoveAttachment(index)}
										className="text-red-500 hover:text-red-700"
									>
										x
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				<button
					type="submit"
					className="w-full rounded-lg bg-blue-100 py-3 font-semibold text-blue-700 transition-colors hover:bg-blue-200 active:bg-blue-300"
				>
					UPDATE TASK
				</button>
			</form>

			<SelectUsersModal
				isOpen={isMembersModalOpen}
				defaultSelectedIds={assignedMembers.map(member => member.id)}
				onClose={() => setIsMembersModalOpen(false)}
				onDone={(selectedUsers: SelectableUser[]) => {
					setAssignedMembers(
						selectedUsers.map(user => ({
							id: user.id,
							name: user.name,
						})),
					)
				}}
			/>
		</div>
	)
}
