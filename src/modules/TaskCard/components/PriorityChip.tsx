import { type PriorityDto } from "../../Priority/types/priority.dto";



export default function PriorityChip({ name, color }: Pick<PriorityDto, "name" | "color">) {
    return (
        <span
            style={{ backgroundColor: `${color}20`, color }}
            className="rounded-lg px-4 py-1.5 text-sm font-semibold"
        >
            {name}
        </span>
    );
}

