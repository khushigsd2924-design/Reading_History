import { useState } from 'react';
import { Trash2, Check, ChevronDown } from 'lucide-react';

import {
  STATUS_META,
  STATUS_ORDER,
  type Book,
  type ReadingStatus,
} from '@/types';

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

export function BookCard({ book, onStatusChange, onRemove }: BookCardProps) {
  const [open, setOpen] = useState(false);
  const meta = STATUS_META[book.status];

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-base font-semibold leading-snug text-slate-900">
            {book.title}
          </h3>
          <span
            className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${meta.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
        </div>
        <button
          onClick={() => onRemove(book.id)}
          aria-label="Delete book"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>

      {/* Status switcher */}
      <div className="relative mt-4">
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 sm:w-auto"
        >
          <span>Change status</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>
        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
            />
            <div className="absolute bottom-full left-0 z-20 mb-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg sm:w-44">
              {STATUS_ORDER.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    onStatusChange(book.id, s);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${STATUS_META[s].dot}`}
                    />
                    {STATUS_META[s].label}
                  </span>
                  {book.status === s && (
                    <Check className="h-4 w-4 text-slate-900" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
