type PriorityChipProps = {
    name?: string;
    color?: string;
};

export default function PriorityChip({ name = "Unknown", color = "#64748B" }: PriorityChipProps) {

    return (
        <span
            style={{ backgroundColor: `${color}20`, color }}
            className="rounded-lg px-4 py-1.5 text-sm font-semibold"
        >
            {name}
        </span>
    );
}

