import { useEffect, useState, type InputHTMLAttributes } from "react";
import Input from "./Input";
import { Check, Pencil, X } from "lucide-react";

interface EditableFieldProps {
  label: string;
  value: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  onSave: (newValue: string) => Promise<void> | void;
}

export default function EditableField({ label, value, type = "text", onSave }: EditableFieldProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const handleSave = async () => {
    try {
      await onSave(draft);
      setEditing(false);
      setError(undefined);
      setSaved(true);
      setTimeout(() => setSaved(false), 1000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Update failed";
      setError(message);
    }
  };

  return (
    <div className="flex flex-col gap-1 mb-6">
      <div className="flex gap-4 items-center">
        <strong className="w-28 text-gray-700 dark:text-gray-300 text-center">{label}:</strong>
        {editing ? (
          <div className="flex items-start gap-2 flex-1">
            <Input
              type={type}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="flex-1"
              error={error}
            />
            <div className="flex flex-row gap-1 items-start mt-2">
              <button
                type="button"
                onClick={handleSave}
                className="p-1 rounded-md hover:bg-green-100"
              >
                <Check className="h-5 w-5 text-green-600" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setDraft(value);
                  setEditing(false);
                  setError(undefined);
                }}
                className="p-1 rounded-md hover:bg-red-100"
              >
                <X className="h-5 w-5 text-red-600" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between flex-1">
            <span className="text-gray-900 dark:text-white">{value}</span>
            {saved ? (
              <Check className="h-5 w-5 text-green-600" />
            ) : (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="p-1 rounded-md hover:bg-gray-100 ms-5"
              >
                <Pencil className="h-5 w-5 text-gray-500" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
