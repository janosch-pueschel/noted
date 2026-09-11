import type { Quote } from "@features/quotes/types";

export interface Book {
  id: number;
  title: string;
  authors: string[];
  thumbnail?: string | null;
  thumbnailSmall?: string | null;
  googleBooksId?: string;
}

export interface BookListItem extends Book {
  totalQuotes: number;
}

export interface BookDetails extends BookListItem {
  quotes: Quote[];
}

export interface GoogleBook {
  googleBooksId: string;
  title: string;
  authors: string[];
  thumbnail?: string | null;
  thumbnailSmall?: string | null;
}

export interface CreateBookData {
  title: string;
  authors: string[];
  thumbnail?: string | null;
  thumbnailSmall?: string | null;
  googleBooksId?: string;
}
