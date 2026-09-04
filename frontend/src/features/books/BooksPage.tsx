import type { Book } from "./types";
import BookCard from "./components/BookCard";
import useFetchData from "../../hooks/useFetchData";

export default function BooksPage() {
  const [books, hasError, isLoading] = useFetchData<Book[]>("/books");

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-2">
        <h1>Books</h1>
        <p className="text-textSecondary">Your personal library</p>
      </div>

      <div className="mt-10 flex flex-col space-y-5">
        {isLoading && (
          <div
            className="flex items-center justify-center py-16"
            role="status"
            aria-live="polite"
          >
            <span className="sr-only">Loading books</span>
            <span
              className="h-8 w-8 animate-spin rounded-full border-2 border-borderPrimary border-t-textPrimary"
              aria-hidden="true"
            />
          </div>
        )}

        {hasError && <p>Unable to load books.</p>}

        {!isLoading &&
          !hasError &&
          books &&
          (books.length > 0 ? (
            books.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <p>No books found</p>
          ))}
      </div>
    </div>
  );
}
