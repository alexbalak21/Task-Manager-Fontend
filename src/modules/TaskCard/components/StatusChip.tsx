import { useEffect } from "react";
import { useStatusStore } from "../../Tasks/state/status.store";

type StatusChipProps = {
    statusName?: string;
};

export default function StatusChip({ statusName = "Unknown" }: StatusChipProps) {
    const statuses = useStatusStore((state) => state.statuses);
    const loadStatuses = useStatusStore((state) => state.loadStatuses);

    useEffect(() => {
        if (statuses.length === 0) {
            void loadStatuses();
        }
    }, [statuses.length, loadStatuses]);

    const resolvedStatus = statuses.find(
        (status) => status.name.trim().toLowerCase() === statusName.trim().toLowerCase(),
    );

    const label = resolvedStatus?.name ?? statusName;
    const color = resolvedStatus?.color ?? "#0D9488";

    return (
        <span
            style={{ backgroundColor: `${color}20`, color }}
            className="rounded-lg px-4 py-1.5 text-sm font-semibold"
        >
            {label}
        </span>
    );
}
