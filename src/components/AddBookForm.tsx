import { useState, type FormEvent } from 'react';
import { Plus } from 'lucide-react';
import {
  STATUS_META,
  STATUS_ORDER,
  type Book,
  type ReadingStatus,
} from '@/types';

interface AddBookFormProps {
  onAdd: (title: string, status: ReadingStatus) => void;
  existingBooks: Book[];
}

export function AddBookForm({ onAdd, existingBooks }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<ReadingStatus>('want-to-read');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Please enter a book title.');
      return;
    }
    if (trimmed.length > 60) {
      setError('Book title must be 60 characters or fewer.');
      return;
    }
    const normalized = trimmed.toLowerCase().replace(/\s+/g, ' ');
    const isDuplicate = existingBooks.some(
      (b) => b.title.trim().toLowerCase().replace(/\s+/g, ' ') === normalized
    );
    if (isDuplicate) {
      setError('This book is already in your reading list.');
      return;
    }
    onAdd(trimmed, status);
    setTitle('');
    setStatus('want-to-read');
    setError('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor="book-title"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Book title
          </label>
          <input
            id="book-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g. The Great Gatsby"
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div className="sm:w-44">
          <label
            htmlFor="book-status"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Status
          </label>
          <select
            id="book-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ReadingStatus)}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 active:bg-slate-800 sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Add Book
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </form>
  );
}
