interface Slice {
  label: string;
  value: number;
  color: string;
}

interface Props {
  title: string;
  slices: Slice[];
}

export default function Donut({ title, slices }: Props) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;

  let current = 0;
  const segments = slices.map(s => {
    const start = (current / total) * 360;
    const end = ((current + s.value) / total) * 360;
    current += s.value;
    return `${s.color} ${start}deg ${end}deg`;
  });

  const gradient = `conic-gradient(${segments.join(",")})`;

  return (
    <div className="h-full rounded-lg bg-white p-4 shadow dark:bg-gray-900 flex flex-col">
      <h2 className="mb-8 text-2xl text-center font-semibold text-gray-800 dark:text-gray-200">
        {title}
      </h2>

      <div className="flex-1 min-h-0 grid place-items-center">
        <div className="relative inline-block h-full max-h-full aspect-square max-w-full">
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: gradient }}
          />
          <div
            className="absolute inset-0 m-auto rounded-full bg-white dark:bg-gray-900"
            style={{ width: "74%", height: "74%" }}
          />
        </div>
      </div>

      {/* UPDATED LEGEND */}
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {slices.map(s => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm" style={{ background: s.color }} />
            <span className="whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
              {s.label} ({s.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}