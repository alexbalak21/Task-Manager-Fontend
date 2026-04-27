type StatusChipProps = {
    name?: string;
    color?: string;
};

export default function StatusChip({ name = "Unknown", color = "#0D9488" }: StatusChipProps) {

    return (
        <span
            style={{ backgroundColor: `${color}20`, color }}
            className="rounded-lg px-4 py-1.5 text-sm font-semibold"
        >
            {name}
        </span>
    );
}
