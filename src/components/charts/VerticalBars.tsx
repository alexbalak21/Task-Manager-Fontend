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
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-15 text-xl font-bold text-slate-900">{title}</h2>

      <div className="grid grid-cols-[44px_1fr] gap-4">
        <div className="relative h-72">
          {ticks
            .slice()
            .reverse()
            .map((tick) => (
              <span
                key={tick}
                className="absolute -translate-y-1/2 text-2xl font-medium text-slate-500"
                style={{ bottom: `${(tick / chartMax) * 100}%` }}
              >
                {tick}
              </span>
            ))}
        </div>

        <div className="flex h-72 items-end justify-around gap-5 px-2 pb-0 sm:gap-8">
          {bars.map((b) => {
            const height = (b.value / chartMax) * 100;
            const barColor = b.color ?? "#4F46E5";

            return (
              <div
                key={b.label}
                className="flex h-full w-full max-w-28 flex-col items-center justify-end"
              >
                <div
                  className="w-full rounded-t-2xl"
                  aria-label={`${b.label}: ${b.value}`}
                  role="img"
                  title={`${b.label}: ${b.value}`}
                  style={{ backgroundColor: barColor, height: `${height}%` }}
                />

                <div className="mt-3 text-lg font-semibold text-slate-600">
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