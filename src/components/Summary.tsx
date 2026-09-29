import { BookOpen, BookMarked, BookCheck } from 'lucide-react';

interface SummaryProps {
  total: number;
  reading: number;
  finished: number;
}

export function Summary({ total, reading, finished }: SummaryProps) {
  const items = [
    {
      label: 'Total Books',
      value: total,
      icon: BookOpen,
      bg: 'bg-slate-100',
      fg: 'text-slate-700',
      accent: 'text-slate-900',
    },
    {
      label: 'Currently Reading',
      value: reading,
      icon: BookMarked,
      bg: 'bg-sky-50',
      fg: 'text-sky-600',
      accent: 'text-sky-900',
    },
    {
      label: 'Finished',
      value: finished,
      icon: BookCheck,
      bg: 'bg-emerald-50',
      fg: 'text-emerald-600',
      accent: 'text-emerald-900',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:py-3.5"
          >
            <div
              className={`mb-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.bg} sm:mb-0`}
            >
              <Icon className={`h-4.5 w-4.5 ${item.fg}`} />
            </div>
            <div className="min-w-0">
              <div className={`text-lg font-bold leading-none sm:text-xl ${item.accent}`}>
                {item.value}
              </div>
              <div className="mt-1 text-[11px] font-medium leading-tight text-slate-500 sm:text-xs">
                {item.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
