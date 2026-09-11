import type { Book } from "@features/books/types";

export interface Quote {
  id: number;
  text: string;
  startPage?: number;
  endPage?: number;
  createdAt: Date;
  book: Book;
  bookId: number;
}
