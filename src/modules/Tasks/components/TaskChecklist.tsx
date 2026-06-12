import MultiStateCheckbox from '../../Todos/components/MultiStateCheckbox'

type ChecklistItem = {
  id: string
  text: string
  state: 'pending' | 'in_progress' | 'completed'
}

type Props = {
  checklist: ChecklistItem[]
  onToggle?: (id: string) => void
}

function mapToCheckboxState(state: ChecklistItem['state']) {
  if (state === 'completed') return 'completed'
  if (state === 'in_progress') return 'in-progress'
  return 'not-started'
}

export default function TaskChecklist({ checklist, onToggle }: Props) {
  return (
    <section className="mb-8">
      <h3 className="mb-4 text-2xl font-semibold text-zinc-700">Todo Checklist</h3>
      <ul className="space-y-5">
        {checklist.map((item) => (
          <li key={item.id} className="flex items-center gap-4 text-2xl text-zinc-900">
            <div className="inline-flex items-center justify-center">
              <MultiStateCheckbox
                state={mapToCheckboxState(item.state)}
                onChange={() => {
                  onToggle?.(item.id)
                }}
              />
            </div>

            <span className={item.state === 'completed' ? 'text-zinc-500 line-through' : ''}>{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
