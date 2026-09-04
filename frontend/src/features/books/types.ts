export interface Book {
  id: number;
  title: string;
  authors: string[];
  thumbnail?: string | null;
  thumbnailSmall?: string | null;
  totalQuotes: number;
}
