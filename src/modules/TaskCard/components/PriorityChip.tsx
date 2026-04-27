import { useEffect } from "react";
import { usePriorityStore } from "../../Priority/store/priority.store";

type PriorityChipProps = {
    priorityName?: string;
};

export default function PriorityChip({ priorityName = "Unknown" }: PriorityChipProps) {
    const priorities = usePriorityStore((state) => state.priorities);
    const loadPriorities = usePriorityStore((state) => state.loadPriorities);

    useEffect(() => {
        if (priorities.length === 0) {
            void loadPriorities();
        }
    }, [priorities.length, loadPriorities]);

    const resolvedPriority = priorities.find(
        (priority) =>
            priority.name.trim().toLowerCase() === priorityName.trim().toLowerCase(),
    );

    const label = resolvedPriority?.name ?? priorityName;
    const color = resolvedPriority?.color ?? "#64748B";

    return (
        <span
            style={{ backgroundColor: `${color}20`, color }}
            className="rounded-lg px-4 py-1.5 text-sm font-semibold"
        >
            {label}
        </span>
    );
}

