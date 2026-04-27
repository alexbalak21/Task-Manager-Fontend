import { useEffect, type ChangeEvent } from "react";
import { usePriorityStore } from "../../Priority/store/priority.store";

interface TaskPrioritySelectProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function TaskPrioritySelect({ value, onChange }: TaskPrioritySelectProps) {
  const priorities = usePriorityStore((state) => state.priorities);
  const loading = usePriorityStore((state) => state.loading);
  const error = usePriorityStore((state) => state.error);
  const loadPriorities = usePriorityStore((state) => state.loadPriorities);

  useEffect(() => {
    if (priorities.length === 0) {
      void loadPriorities();
    }
  }, [priorities.length, loadPriorities]);

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
        Priority
      </label>
      <select
        name="priority"
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5"
      >
        {priorities.map((priority) => (
          <option key={priority.id} value={priority.name}>
            {priority.name}
          </option>
        ))}

        {loading && priorities.length === 0 && (
          <option value="" disabled>
            Loading priorities...
          </option>
        )}
      </select>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
