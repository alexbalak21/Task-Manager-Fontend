import type { ChangeEvent } from "react";

interface TaskPrioritySelectProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function TaskPrioritySelect({ value, onChange }: TaskPrioritySelectProps) {
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
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Urgent</option>
      </select>
    </div>
  );
}
