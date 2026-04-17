import type { ChangeEvent } from "react";

interface TaskDueDateInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TaskDueDateInput({ value, onChange }: TaskDueDateInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
        Due Date
      </label>
      <input
        type="date"
        name="dueDate"
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5"
      />
    </div>
  );
}
