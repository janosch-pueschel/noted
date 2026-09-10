import { Link } from "react-router-dom";
import { ArrowForwardIosRounded, FormatQuote } from "@mui/icons-material";

import bookPlaceholder from "../../../assets/images/book-cover_placeholder.png";
import type { Book } from "../types";

interface BookCardProps {
  key: number;
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { id, title, authors, thumbnailSmall, totalQuotes } = book;

  return (
    <Link
      to={`/books/${id}`}
      className="flex justify-between items-center border-borderPrimary p-4 rounded-lg border-2"
    >
      <div className="flex space-x-5 items-center">
        <div className="w-16 shrink-0 shadow-md rounded-sm overflow-hidden">
          <img
            src={thumbnailSmall ?? bookPlaceholder}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="font-serif text-lg font-semibold">{title}</h2>
            <p className="text-textSecondary mt-1">{authors}</p>
          </div>

          <p className="flex space-x-1 items-center text-textSecondary">
            {totalQuotes > 0 && (
              <>
                <FormatQuote fontSize="small" />
                {totalQuotes > 1 ? (
                  <span>{`${totalQuotes} quotes`}</span>
                ) : (
                  <span>{`${totalQuotes} quote`}</span>
                )}
              </>
            )}
          </p>
        </div>
      </div>
      <ArrowForwardIosRounded className="text-textSecondary" />
    </Link>
  );
}
