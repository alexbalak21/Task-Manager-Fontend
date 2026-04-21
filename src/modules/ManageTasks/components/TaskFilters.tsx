
type TaskFilter = {
  label: string;
  id: number | string;
  count: number;
};

interface TaskFiltersProps {
  filters: TaskFilter[];
  activeFilter: number | string;
  setActiveFilter: (id: number | string) => void;
}

export function TaskFilters({ filters, activeFilter, setActiveFilter }: TaskFiltersProps) {
  return (
    <nav className="flex items-center gap-4 text-lg text-gray-600">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          onClick={() => setActiveFilter(filter.id)}
          className={[
            "inline-flex items-center gap-3 border-b-2 pb-2 font-medium transition-colors",
            activeFilter === filter.id
              ? "border-primary-500 text-primary-500"
              : "border-transparent text-gray-600 hover:text-gray-800",
          ].join(" ")}
        >
          <span>{filter.label}</span>
          <span
            className={[
              "inline-flex min-w-7 items-center justify-center rounded-full px-2 py-0.5 text-sm font-semibold",
              activeFilter === filter.id
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-gray-500",
            ].join(" ")}
          >
            {filter.count}
          </span>
        </button>
      ))}
    </nav>
  );
}
