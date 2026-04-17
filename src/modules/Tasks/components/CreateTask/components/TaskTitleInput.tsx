import type { ChangeEvent } from "react";

interface TaskTitleInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TaskTitleInput({ value, onChange }: TaskTitleInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
        Task Title
      </label>
      <input
        type="text"
        name="title"
        value={value}
        onChange={onChange}
        placeholder="Create App UI"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
      />
    </div>
  );
}
