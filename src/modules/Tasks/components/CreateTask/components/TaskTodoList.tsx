import { Plus } from "lucide-react";
import type { KeyboardEvent } from "react";
import type { TodoItem } from "../hooks/useTodoList";

interface TaskTodoListProps {
  items: TodoItem[];
  input: string;
  onInput: (value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default function TaskTodoList({
  items,
  input,
  onInput,
  onAdd,
  onRemove,
  onKeyDown,
}: TaskTodoListProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
        TODO Checklist
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => onInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Enter Task"
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5"
        />
        <button
          type="button"
          onClick={onAdd}
          className="rounded-lg bg-zinc-400 px-4 text-white"
        >
          <Plus size={20} />
        </button>
      </div>

      {items.length > 0 && (
        <div className="mt-3 space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
            >
              <span className="text-sm">{item.text}</span>
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
