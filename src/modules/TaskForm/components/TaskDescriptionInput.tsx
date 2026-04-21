import type { ChangeEvent } from "react";

interface TaskDescriptionInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TaskDescriptionInput({ value, onChange }: TaskDescriptionInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
        Description
      </label>
      <textarea
        name="description"
        value={value}
        onChange={onChange}
        rows={5}
        placeholder="Describe task"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
      />
    </div>
  );
}
