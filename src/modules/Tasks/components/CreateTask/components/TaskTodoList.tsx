import { Plus, Trash2 } from "lucide-react";
import type { KeyboardEvent } from "react";
import type { TodoItem } from "../hooks/useTodoList";

interface TaskTodoListProps {
  TodoItems: TodoItem[];
  input: string;
  onInput: (value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default function TaskTodoList({
  TodoItems,
  input,
  onInput,
  onAdd,
  onRemove,
  onKeyDown,
}: TaskTodoListProps) {

  const addTodo = () => {
    if (input.trim() === "") return;
    onAdd();        // parent adds the todo
    onInput("");    // clear input
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
        TODO Checklist
      </label>

      {/* LOCKED LIST */}
      {TodoItems.length > 0 && (
        <div className="mb-4 space-y-2">
          {TodoItems.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center rounded-lg bg-gray-50 border border-gray-300 px-3 py-3 text-base"
            >
              <span className="text-gray-500 me-4">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span>{item.text}</span>

              <button
                className="text-red-600 ms-auto"
                onClick={() => onRemove(item.id)}
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* INPUT + ADD BUTTON */}
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
          onClick={addTodo}
          className="rounded-lg bg-zinc-400 px-4 text-white"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}
