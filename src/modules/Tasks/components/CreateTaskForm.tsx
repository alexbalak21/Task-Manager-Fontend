import { useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from 'react'
import { Plus, Paperclip, Users } from 'lucide-react'
import SelectUsersModal, { type SelectableUser } from '../../Users/components/SelectUsersModal'
import { useToast } from '../../../components/ui/ToastProvider'
import { useCreateTask } from '../hooks/useCreateTask'

interface TodoItem {
  id: string
  text: string
}

interface AssignedMember {
  id: string
  name: string
}

const PRIORITY_TO_ID: Record<string, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
  Urgent: 4,
}

const DEFAULT_STATUS_ID = 1

const getTodayLocalDate = () => {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

const toApiDateTime = (date: string, time: string) => `${date}T${time}`

const toNumericUserId = (value: string) => {
  const parsed = Number(value)
  if (Number.isInteger(parsed) && parsed > 0) {
    return parsed
  }
  return null
}

export default function CreateTaskForm() {
  const toast = useToast()
  const { createTask, isSubmitting, error } = useCreateTask()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
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
      [name]: value
    }))
  }

  const handleAddTodo = () => {
    if (todoInput.trim()) {
      setTodoItems(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: todoInput
        }
      ])
      setTodoInput('')
    }
  }

  const handleRemoveTodo = (id: string) => {
    setTodoItems(prev => prev.filter(item => item.id !== id))
  }

  const handleTodoKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    handleAddTodo()
  }

  const handleAddAttachment = () => {
    // Placeholder for file attachment logic
    const link = prompt('Enter file link:')
    if (link) {
      setAttachments(prev => [...prev, link])
    }
  }

  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const title = formData.title.trim()
    if (!title) {
      toast.error('Title is required')
      return
    }

    if (!formData.dueDate) {
      toast.error('Due date is required')
      return
    }

    const users = assignedMembers
      .map(member => toNumericUserId(member.id))
      .filter((id): id is number => id !== null)

    const todos = todoItems
      .map(item => item.text.trim())
      .filter(item => item.length > 0)

    const priorityId = PRIORITY_TO_ID[formData.priority] ?? 1
    const startDate = toApiDateTime(getTodayLocalDate(), '09:00:00')
    const dueDate = toApiDateTime(formData.dueDate, '10:00:00')

    try {
      await createTask({
        title,
        description: formData.description.trim(),
        priority_id: priorityId,
        status_id: DEFAULT_STATUS_ID,
        start_date: startDate,
        due_date: dueDate,
        users,
        todos,
      })

      setFormData({
        title: '',
        description: '',
        priority: 'Low',
        dueDate: '',
      })
      setTodoItems([])
      setTodoInput('')
      setAssignedMembers([])
      setAttachments([])

      toast.success('Task created', 'The task has been created successfully.')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not create task'
      toast.error('Task creation failed', message)
    }
  }

  return (
    <div className="mx-auto max-w-5xl rounded-lg bg-white p-8 shadow-sm">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Create Task</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Title */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
            Task Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Create App UI"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 placeholder-gray-400 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe task"
            rows={5}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 placeholder-gray-400 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Priority, Due Date, Assign To */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Priority */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
              Priority
            </label>
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

          {/* Due Date */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Assign To */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
              Assign To
            </label>
            <button
              type="button"
              onClick={() => setIsMembersModalOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-zinc-100 py-2.5 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              <Users/> Add Members
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
                          prev.filter(m => m.id !== member.id)
                        )
                      }
                      className="font-bold hover:text-blue-900 dark:hover:text-blue-100"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* TODO Checklist */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
            TODO Checklist
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={todoInput}
              onChange={e => setTodoInput(e.target.value)}
              onKeyDown={handleTodoKeyDown}
              placeholder="Enter Task"
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 placeholder-gray-400 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="button"
              onClick={handleAddTodo}
              className="rounded-lg bg-zinc-400 px-4 text-white hover:bg-zinc-500"
            >
              <Plus size={20} />
            </button>
          </div>
          {todoItems.length > 0 && (
            <div className="mt-3 space-y-2">
              {todoItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700"
                >
                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    {item.text}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTodo(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Attachments */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
            Add Attachments
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add File Link"
              disabled
              className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 placeholder-gray-400 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="button"
              onClick={handleAddAttachment}
              className="rounded-lg  bg-neutral-400 px-4 text-white hover:bg-zinc-500"
            >
              <Plus size={20} />
            </button>
          </div>
          {attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <Paperclip size={16} className="text-gray-600 dark:text-gray-400" />
                    <span className="truncate text-sm text-gray-700 dark:text-gray-200">
                      {attachment}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-primary-450 py-3 font-semibold text-white transition-colors hover:bg-primary-500 active:bg-primary-600"
        >
          {isSubmitting ? 'CREATING TASK...' : 'CREATE TASK'}
        </button>
      </form>

      <SelectUsersModal
        isOpen={isMembersModalOpen}
        defaultSelectedIds={assignedMembers.map((member) => member.id)}
        onClose={() => setIsMembersModalOpen(false)}
        onDone={(selectedUsers: SelectableUser[]) => {
          setAssignedMembers(
            selectedUsers.map((user) => ({
              id: user.id,
              name: user.name
            }))
          )
        }}
      />
    </div>
  )
}
