import type { ChangeEvent } from "react";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import bookPlaceholder from "@assets/images/book-cover_placeholder.png";
import Button from "@components/Button";
import ErrorMessage from "@components/ErrorMessage";
import LoadingSpinner from "@components/LoadingSpinner";
import Modal from "@components/Modal";
import useDebounce from "@hooks/useDebounce";
import useFetchData from "@hooks/useFetchData";
import useMutation from "@hooks/useMutation";

import BookCard from "../components/BookCard";
import type { Book, CreateBookData, GoogleBook } from "../types";

export default function BooksPage() {
  const [books, hasBooksError, isBooksLoading, refetchBooks] =
    useFetchData<Book[]>("/books");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userInput, setUserInput] = useState("");
  const debouncedUserInput = useDebounce(userInput, 400);
  const searchTerm = debouncedUserInput.split(" ").join("+");
  const searchUrl =
    debouncedUserInput.trim().length < 3 ? "" : `/books/search?q=${searchTerm}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    setUserInput(input);
  };

  const [search, hasSearchError, isSearchLoading] =
    useFetchData<GoogleBook[]>(searchUrl);

  const createBook = useMutation<CreateBookData, Book>("/books", "POST");

  const handleCreateBook = async (result: CreateBookData) => {
    await createBook(result);
    await refetchBooks();
  };

  return (
    <div className="container mx-auto px-4 py-6">
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

      <Modal
        isOpen={isModalOpen}
        onClick={() => {
          setIsModalOpen(false);
          setUserInput("");
        }}
      >
        <div className="relative">
          <div className="flex items-start justify-between gap-4 ">
            <h2
              id="search-book-title"
              className="font-serif text-xl font-semibold"
            >
              Search Book
            </h2>
          </div>

          <label className="mt-5 block">
            <span className="sr-only">Book title or author</span>
            <input
              type="text"
              placeholder="Title or author"
              className="w-full rounded-lg border-2 border-borderPrimary bg-bgPrimary px-4 py-3 text-textPrimary outline-none placeholder:text-textSecondary focus:border-buttonPrimary"
              onChange={handleChange}
              value={userInput}
            />
          </label>
          {debouncedUserInput.length > 3 && (
            <>
              {isSearchLoading && (
                <LoadingSpinner screenReaderText="Loading book search results" />
              )}

              {hasSearchError && (
                <ul className="bg-bgPrimary absolute w-full left-0 px-4 py-3 rounded-lg border-2 border-borderPrimary flex flex-col gap-6 mt-2 overflow-y-auto max-h-[50vh]">
                  <ErrorMessage>Failed to search books.</ErrorMessage>
                </ul>
              )}

              {!isSearchLoading && !hasSearchError && search && (
                <ul className="bg-bgPrimary absolute w-full left-0 px-4 py-3 rounded-lg border-2 border-borderPrimary flex flex-col gap-6 mt-2 overflow-y-auto max-h-[50vh]">
                  {search.length > 0 &&
                    search.map((result) => {
                      return (
                        <li
                          key={result.googleBooksId}
                          className="flex gap-3 items-center"
                          onClick={() => {
                            handleCreateBook(result);
                            setIsModalOpen(false);
                          }}
                        >
                          <div className="w-10 shrink-0 shadow-md">
                            <img
                              src={result.thumbnailSmall ?? bookPlaceholder}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold truncate">{result.title}</p>
                            <p className="truncate text-textSecondary">
                              {result.authors.join(" · ")}
                            </p>
                          </div>
                        </li>
                      );
                    })}

                  {search.length === 0 && (
                    <li className="px-4 py-3 text-textSecondary">
                      No books found.
                    </li>
                  )}
                </ul>
              )}
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
