import { Routes, Route } from "react-router-dom";
import BooksPage from "../features/Books/BooksPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="books" element={<BooksPage />} />
    </Routes>
  );
}
