import { useEffect, useMemo, useState } from 'react';
import { Library } from 'lucide-react';
import type { Book, ReadingStatus } from '@/types';
import { FILTER_OPTIONS } from '@/types';
import { loadBooks, saveBooks } from '@/storage';
import { AddBookForm } from '@/components/AddBookForm';
import { FilterTabs } from '@/components/FilterTabs';
import { BookCard } from '@/components/BookCard';
import { EmptyState } from '@/components/EmptyState';
import { Summary } from '@/components/Summary';

type FilterValue = (typeof FILTER_OPTIONS)[number]['value'];

function makeId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function App() {
  const [books, setBooks] = useState<Book[]>(() => loadBooks());
  const [filter, setFilter] = useState<FilterValue>('all');

  useEffect(() => {
    saveBooks(books);
  }, [books]);

  function addBook(title: string, status: ReadingStatus) {
    const book: Book = {
      id: makeId(),
      title,
      status,
      createdAt: Date.now(),
    };
    setBooks((prev) => [book, ...prev]);
  }

  function changeStatus(id: string, status: ReadingStatus) {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  }

  function removeBook(id: string) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }

  const counts = useMemo<Record<FilterValue, number>>(() => {
    const base: Record<FilterValue, number> = {
      all: books.length,
      'want-to-read': 0,
      reading: 0,
      finished: 0,
    };
    for (const b of books) base[b.status]++;
    return base;
  }, [books]);

  const visibleBooks = useMemo(() => {
    if (filter === 'all') return books;
    return books.filter((b) => b.status === filter);
  }, [books, filter]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900">
              <Library className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Reading List
              </h1>
              <p className="text-sm text-slate-500">
                Track the books you want to read, are reading, and have finished.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <AddBookForm onAdd={addBook} existingBooks={books} />

        {books.length > 0 && (
          <div className="mt-6 space-y-6">
            <Summary
              total={books.length}
              reading={counts['reading']}
              finished={counts['finished']}
            />
            <FilterTabs
              active={filter}
              counts={counts}
              onChange={setFilter}
            />
          </div>
        )}

        <div className="mt-6">
          {books.length === 0 ? (
            <EmptyState />
          ) : visibleBooks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center">
              <p className="text-sm text-slate-500">
                No books in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {visibleBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onStatusChange={changeStatus}
                  onRemove={removeBook}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="mx-auto max-w-3xl px-4 pb-10 pt-2 sm:px-6">
        <p className="text-center text-xs text-slate-400">
          Your reading list is saved on this device.
        </p>
      </footer>
    </div>
  );
}

export default App;
