import { type ChangeEvent, useState } from "react";

import bookPlaceholder from "@assets/images/book-cover_placeholder.png";
import ErrorMessage from "@components/ErrorMessage";
import LoadingSpinner from "@components/LoadingSpinner";
import Modal from "@components/Modal";
import useDebounce from "@hooks/useDebounce";
import useFetchData from "@hooks/useFetchData";
import useMutation from "@hooks/useMutation";

import type { Book, CreateBookData, GoogleBook } from "../types";

interface AddBookModalProps {
  isOpen: boolean;
  closeModal: () => void;
  refetchBooks: () => Promise<void>;
}

export default function AddBookModal({
  isOpen,
  closeModal,
  refetchBooks,
}: AddBookModalProps) {
  const [hasCreateBookFailure, setHasCreateBookFailure] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [userInput, setUserInput] = useState("");
  const debouncedUserInput = useDebounce(userInput, 400);
  const searchTerm = debouncedUserInput.split(" ").join("+");
  const searchUrl =
    debouncedUserInput.trim().length < 3 ? "" : `/books/search?q=${searchTerm}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setHasCreateBookFailure(false);

    setUserInput(input);
  };

  const [search, hasSearchError, isSearchLoading] =
    useFetchData<GoogleBook[]>(searchUrl);

  const createBook = useMutation<CreateBookData, Book>("/books", "POST");

  const handleClose = () => {
    closeModal();
    setUserInput("");
    setHasCreateBookFailure(false);
    setIsCreating(false);
  };

  const handleCreateBook = async (result: CreateBookData) => {
    if (isCreating) {
      return;
    }

    setIsCreating(true);
    setHasCreateBookFailure(false);

    try {
      await createBook(result);
      await refetchBooks();
      handleClose();
    } catch (err) {
      console.error(err);
      setHasCreateBookFailure(true);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClick={handleClose}>
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

        {hasCreateBookFailure && (
          <div className="mt-3">
            <ErrorMessage>Failed to add book. Please try again.</ErrorMessage>
          </div>
        )}

        {debouncedUserInput.trim().length >= 3 && (
          <>
            {isSearchLoading && (
              <div className="bg-bgPrimary absolute w-full left-0 px-4 py-3 rounded-lg border-2 border-borderPrimary flex flex-col gap-6 mt-2 overflow-y-auto max-h-[50vh]">
                <LoadingSpinner screenReaderText="Loading book search results" />
              </div>
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
                        className={`flex gap-3 items-center ${
                          isCreating
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }`}
                        onClick={() => {
                          handleCreateBook(result);
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
  );
}
