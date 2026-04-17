import { Paperclip, Plus } from "lucide-react";

interface TaskAttachmentsProps {
  attachments: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export default function TaskAttachments({
  attachments,
  onAdd,
  onRemove,
}: TaskAttachmentsProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
        Add Attachments
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          disabled
          placeholder="Add File Link"
          className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5"
        />
        <button
          type="button"
          onClick={onAdd}
          className="rounded-lg bg-neutral-400 px-4 text-white"
        >
          <Plus size={20} />
        </button>
      </div>

      {attachments.length > 0 && (
        <div className="mt-3 space-y-2">
          {attachments.map((attachment, index) => (
            <div
              key={`${attachment}-${index}`}
              className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <Paperclip size={16} />
                <span className="truncate text-sm">{attachment}</span>
              </div>
              <button
                type="button"
                onClick={() => onRemove(index)}
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
