export interface Book {
  id: number;
  title: string;
  authors: string[];
  thumbnail?: string | null;
  thumbnailSmall?: string | null;
  totalQuotes: number;
  googleBooksId?: string;
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
