interface Bar {
  label: string;
  value: number;
  color?: string;
}

interface Props {
  title: string;
  bars: Bar[];
}

export default function VerticalBars({ title, bars }: Props) {
  const maxValue = Math.max(...bars.map((b) => b.value), 1);
  const chartMax = Math.ceil(maxValue / 2) * 2;
  const tickStep = Math.max(chartMax / 4, 1);
  const ticks = [0, 1, 2, 3, 4].map((i) => Math.round(i * tickStep));

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <h2 className="mb-6 text-center text-xl font-bold text-slate-900 sm:text-2xl">{title}</h2>

      <div className="grid flex-1 min-h-60 min-w-0 grid-cols-[34px_1fr] gap-2 sm:grid-cols-[44px_1fr] sm:gap-4">
        <div className="relative h-full">
          {ticks
            .slice()
            .reverse()
            .map((tick) => (
              <span
                key={tick}
                className="absolute -translate-y-1/2 text-sm font-medium text-slate-500 sm:text-base"
                style={{ bottom: `${(tick / chartMax) * 100}%` }}
              >
                {tick}
              </span>
            ))}
        </div>

        <div
          className="grid h-full min-w-0 items-end gap-3 border-b border-slate-200 px-1 sm:gap-12 sm:px-2"
          style={{ gridTemplateColumns: `repeat(${bars.length}, minmax(0, 1fr))` }}
        >
          {bars.map((b) => {
            const height = (b.value / chartMax) * 100;
            const barColor = b.color ?? "#4F46E5";

            return (
              <div
                key={b.label}
                className="flex h-full min-w-0 flex-col items-center justify-end"
              >
                <div
                  className="w-full rounded-t-xl sm:rounded-t-2xl"
                  aria-label={`${b.label}: ${b.value}`}
                  role="img"
                  title={`${b.label}: ${b.value}`}
                  style={{ backgroundColor: barColor, height: `${height}%` }}
                />

                <div className="mt-2 w-full truncate text-center text-sm font-semibold text-slate-600 sm:mt-3 sm:text-base lg:text-lg">
                  {b.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}