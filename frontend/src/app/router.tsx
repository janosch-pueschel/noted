import { Route, Routes } from "react-router-dom";

import BookDetailPage from "../features/books/pages/BookDetailPage";
import BooksPage from "../features/books/pages/BooksPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="books" element={<BooksPage />} />
      <Route path="books/:bookId" element={<BookDetailPage />} />
    </Routes>
  );
}
