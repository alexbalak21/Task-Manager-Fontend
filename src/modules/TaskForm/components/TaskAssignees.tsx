import { Users } from "lucide-react";
import type { AssignedMember } from "../hooks/useAssignees";

interface TaskAssigneesProps {
  assignedMembers: AssignedMember[];
  loading: boolean;
  onRemove: (id: string) => void;
  onOpenModal: () => void;
}

export default function TaskAssignees({
  assignedMembers,
  loading,
  onRemove,
  onOpenModal,
}: TaskAssigneesProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
        Assign To
      </label>

      <button
        type="button"
        onClick={onOpenModal}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-zinc-100 py-2.5"
      >
        <Users /> {loading ? "Loading..." : "Add Members"}
      </button>

      {assignedMembers.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {assignedMembers.map((member) => (
            <span
              key={member.id}
              className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700"
            >
              {member.name}
              <button
                type="button"
                onClick={() => onRemove(member.id)}
                className="font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
