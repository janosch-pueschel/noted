import { type ChangeEvent, type SubmitEvent, useState } from "react";

import Button from "@components/Button";
import ErrorMessage from "@components/ErrorMessage";
import Modal from "@components/Modal";
import useMutation from "@hooks/useMutation";

import type { CreateQuoteData, Quote } from "../types";

interface AddQuoteModalProps {
  isOpen: boolean;
  closeModal: () => void;
  bookId: number;
  refetchBook: () => Promise<void>;
}

const inputClassName =
  "w-full rounded-lg border-2 border-borderPrimary bg-bgPrimary px-4 py-3 text-textPrimary outline-none placeholder:text-textSecondary focus:border-buttonPrimary";

function parsePage(value: string): number | undefined | "invalid" {
  const trimmed = value.trim();

  if (trimmed === "") {
    return undefined;
  }

  const page = Number(trimmed);

  if (!Number.isInteger(page) || page < 1) {
    return "invalid";
  }

  return page;
}

function buildQuoteData(
  quoteText: string,
  startPageValue: string,
  endPageValue: string,
  bookId: number,
): { error: string } | { quoteData: CreateQuoteData } {
  const trimmedQuoteText = quoteText.trim();

  if (trimmedQuoteText === "") {
    return { error: "Quote text is required." };
  }

  const startPage = parsePage(startPageValue);

  if (startPage === "invalid") {
    return { error: "Start page has to be a positive number." };
  }

  const endPage = parsePage(endPageValue);

  if (endPage === "invalid") {
    return { error: "End page has to be a positive number." };
  }

  if (endPage !== undefined && startPage === undefined) {
    return {
      error:
        "If an end page is provided, a start page has to be provided as well.",
    };
  }

  if (
    startPage !== undefined &&
    endPage !== undefined &&
    endPage <= startPage
  ) {
    return { error: "End page has to be greater than the start page." };
  }

  const quoteData: CreateQuoteData = {
    text: trimmedQuoteText,
    bookId,
  };

  if (startPage !== undefined) {
    quoteData.startPage = startPage;
  }

  if (endPage !== undefined) {
    quoteData.endPage = endPage;
  }

  return { quoteData };
}

export default function AddQuoteModal({
  isOpen,
  closeModal,
  bookId,
  refetchBook,
}: AddQuoteModalProps) {
  const [quoteText, setQuote] = useState("");
  const [startPage, setStartPage] = useState("");
  const [endPage, setEndPage] = useState("");
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );
  const [hasCreateQuoteFailure, setHasCreateQuoteFailure] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const createQuote = useMutation<CreateQuoteData, Quote>("/quotes", "POST");

  const clearFeedback = () => {
    setValidationMessage(null);
    setHasCreateQuoteFailure(false);
  };

  const handleClose = () => {
    closeModal();
    setQuote("");
    setStartPage("");
    setEndPage("");
    clearFeedback();
    setIsCreating(false);
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuote(event.target.value);
    clearFeedback();
  };

  const handleStartPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartPage(event.target.value);
    clearFeedback();
  };

  const handleEndPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndPage(event.target.value);
    clearFeedback();
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCreating) {
      return;
    }

    const result = buildQuoteData(quoteText, startPage, endPage, bookId);

    if ("error" in result) {
      setValidationMessage(result.error);
      setHasCreateQuoteFailure(false);
      return;
    }

    setIsCreating(true);
    setValidationMessage(null);
    setHasCreateQuoteFailure(false);

    try {
      await createQuote(result.quoteData);
      await refetchBook();
      handleClose();
    } catch (err) {
      console.error(err);
      setHasCreateQuoteFailure(true);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClick={handleClose} titleId="add-quote-title">
      <div>
        <h2 id="add-quote-title" className="font-serif text-xl font-semibold">
          Add Quote
        </h2>

        <form className="mt-5" noValidate onSubmit={handleSubmit}>
          <label className="block" htmlFor="quote-text">
            <span className="mb-2 block">Quote Text</span>
            <textarea
              id="quote-text"
              rows={4}
              className={inputClassName}
              value={quoteText}
              onChange={handleTextChange}
              placeholder="Enter your quote here..."
            />
          </label>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <label className="block" htmlFor="quote-start-page">
              <span className="mb-2 block">
                Start Page{" "}
                <span className="font-normal text-textSecondary text-xs">
                  (optional)
                </span>
              </span>
              <input
                id="quote-start-page"
                type="number"
                min={1}
                className={inputClassName}
                value={startPage}
                onChange={handleStartPageChange}
                placeholder="e.g. 37"
              />
            </label>

            <label className="block" htmlFor="quote-end-page">
              <span className="mb-2 block">
                End Page{" "}
                <span className="font-normal text-textSecondary text-xs">
                  (optional)
                </span>
              </span>
              <input
                id="quote-end-page"
                type="number"
                min={1}
                className={inputClassName}
                value={endPage}
                onChange={handleEndPageChange}
                placeholder="e.g. 39"
              />
            </label>
          </div>

          {validationMessage && (
            <div className="mt-3">
              <ErrorMessage>{validationMessage}</ErrorMessage>
            </div>
          )}

          {hasCreateQuoteFailure && (
            <div className="mt-3">
              <ErrorMessage>
                Failed to add quote. Please try again.
              </ErrorMessage>
            </div>
          )}

          <div className="mt-16 flex justify-end gap-3">
            <Button onClick={closeModal} variant="secondary">
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              Save Quote
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
