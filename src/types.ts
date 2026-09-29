export type ReadingStatus = 'want-to-read' | 'reading' | 'finished';

export interface Book {
  id: string;
  title: string;
  status: ReadingStatus;
  createdAt: number;
}

export const STATUS_META: Record<
  ReadingStatus,
  { label: string; short: string; badge: string; dot: string }
> = {
  'want-to-read': {
    label: 'Want to Read',
    short: 'Want to Read',
    badge: 'bg-amber-100 text-amber-800 border-amber-200',
    dot: 'bg-amber-500',
  },
  reading: {
    label: 'Reading',
    short: 'Reading',
    badge: 'bg-sky-100 text-sky-800 border-sky-200',
    dot: 'bg-sky-500',
  },
  finished: {
    label: 'Finished',
    short: 'Finished',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    dot: 'bg-emerald-500',
  },
};

export const STATUS_ORDER: ReadingStatus[] = [
  'want-to-read',
  'reading',
  'finished',
];

export const FILTER_OPTIONS: { value: 'all' | ReadingStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'want-to-read', label: 'Want to Read' },
  { value: 'reading', label: 'Reading' },
  { value: 'finished', label: 'Finished' },
];
