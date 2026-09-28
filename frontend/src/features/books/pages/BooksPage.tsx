import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import Button from "@components/Button";
import ErrorMessage from "@components/ErrorMessage";
import LoadingSpinner from "@components/LoadingSpinner";
import useFetchData from "@hooks/useFetchData";

import AddBookModal from "../components/AddBookModal";
import BookCard from "../components/BookCard";
import type { BookListItem } from "../types";

export default function BooksPage() {
  const [books, hasBooksError, isBooksLoading, refetchBooks] =
    useFetchData<BookListItem[]>("/books");

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="page-container">
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-2">
          <h1>Books</h1>
          <p className="text-textSecondary">Your personal library</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <AddIcon className="mr-2" />
          Add Book
        </Button>
      </div>

      <div className="mt-10 flex flex-col space-y-5">
        {isBooksLoading && (
          <LoadingSpinner screenReaderText="Loading book data" />
        )}

        {hasBooksError && <ErrorMessage>Failed to load books.</ErrorMessage>}

        {!isBooksLoading && !hasBooksError && books && (
          <>
            {books.length > 0 &&
              books.map((book) => <BookCard key={book.id} book={book} />)}

            {books.length === 0 && <p>No books found</p>}
          </>
        )}
      </div>

      <AddBookModal
        isOpen={isModalOpen}
        closeModal={() => {
          setIsModalOpen(false);
        }}
        refetchBooks={refetchBooks}
      />
    </div>
  );
}
