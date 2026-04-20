import { Plus, Trash2, Paperclip } from "lucide-react";

interface TaskAttachmentsProps {
  attachments: string[];
  input: string;
  onInput: (value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export default function TaskAttachments({
  attachments,
  input,
  onInput,
  onAdd,
  onRemove,
}: TaskAttachmentsProps) {

  const add = () => {
    if (input.trim() === "") return;
    onAdd();
    onInput("");
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
        Add Attachments
      </label>

      {/* INPUT + ADD BUTTON */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => onInput(e.target.value)}
          placeholder="Add File Link"
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5"
        />

        <button
          type="button"
          onClick={add}
          className="rounded-lg bg-neutral-400 px-4 text-white"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* LOCKED LIST */}
      {attachments.length > 0 && (
        <div className="mt-3 space-y-2">
          {attachments.map((attachment, index) => (
            <div
              key={`${attachment}-${index}`}
              className="flex items-center rounded-lg bg-gray-50 border border-gray-300 px-3 py-3"
            >
              <Paperclip size={16} className="me-3" />

              <span className="truncate">{attachment}</span>

              <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-red-600 ms-auto"
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
