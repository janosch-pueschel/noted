import { Link, useParams } from "react-router-dom";
import { Add, ArrowForwardIosRounded, FormatQuote } from "@mui/icons-material";
import QuoteCard from "@features/quotes/components/QuoteCard";
import type { Quote } from "@features/quotes/types";

import bookPlaceholder from "@assets/images/book-cover_placeholder.png";
import Button from "@components/Button";
import LoadingSpinner from "@components/LoadingSpinner";
import useFetchData from "@hooks/useFetchData";

import type { BookDetails } from "../types";

export default function BookDetailPage() {
  const { bookId } = useParams();

  const [bookDetails, hasBookDetailsError, isBookDetailsLoading] =
    useFetchData<BookDetails>(`/books/${bookId}`);

  if (isBookDetailsLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (hasBookDetailsError || !bookDetails) {
    return (
      <div className="page-container flex min-h-[60vh] items-center justify-center">
        <div className="flex max-w-md flex-col items-center text-centxer">
          <FormatQuote
            className="mb-5 text-textSecondary"
            sx={{ fontSize: 40 }}
          />

          <h1 className="mb-2 text-2xl">
            {hasBookDetailsError ? "Something went wrong" : "Book not found"}
          </h1>

          <p className="mb-8 text-textSecondary">
            {hasBookDetailsError
              ? "We couldn't load this book. Please try again."
              : "The book you're looking for doesn't exist or may have been removed."}
          </p>

          <Link to="/books">
            <Button>Back to books</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { title, authors, totalQuotes, thumbnail, quotes } = bookDetails;

  return (
    <>
      <div className="page-container">
        <div className="flex items-center gap-2 text-textSecondary text-sm font-medium mb-10">
          <Link to="/books">Books</Link>
          <ArrowForwardIosRounded sx={{ fontSize: 12 }} />
          <p>{title}</p>
        </div>

        <div className="flex gap-10 mb-20">
          <div className="w-1/3 shrink-0 shadow-md rounded-md overflow-hidden">
            <img
              src={thumbnail ?? bookPlaceholder}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col space-y-3">
              <h1>{title}</h1>
              <p className="truncate text-textSecondary">
                {authors.join(" · ")}
              </p>
              {totalQuotes > 0 && (
                <p className="flex space-x-1 items-center text-textSecondary">
                  <FormatQuote fontSize="small" />
                  {totalQuotes > 1 ? (
                    <span>{`${totalQuotes} quotes`}</span>
                  ) : (
                    <span>{`${totalQuotes} quote`}</span>
                  )}
                </p>
              )}
            </div>

            <div>
              <Button onClick={() => {}}>
                <Add className="mr-2" />
                Add Quote
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-xl">Quotes</h2>

          {quotes.length === 0 && (
            <p className="text-textSecondary mt-10">
              You haven't added any quotes from this book yet.
            </p>
          )}

          {quotes.length > 0 && (
            <div className="flex flex-col space-y-5 mt-10">
              {quotes.map((quote: Quote) => {
                return <QuoteCard key={quote.id} quote={quote}></QuoteCard>;
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
