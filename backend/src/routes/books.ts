import { Router } from "express";

import {
  createBookValidation,
  getBookByIdValidation,
  destroyBookValidation,
  updateBookValidation,
  searchBookValidation,
} from "../middleware/validation/bookValidation";
import { handleValidation } from "../middleware/validation/handleValidation";
import {
  getAll,
  getById,
  create,
  destroy,
  patch,
  search,
} from "../controllers/booksController";

export const booksRouter = Router();

booksRouter.get("/", getAll);
booksRouter.get("/search", searchBookValidation, handleValidation, search);
booksRouter.get("/:bookId", getBookByIdValidation, handleValidation, getById);
booksRouter.post("/", createBookValidation, handleValidation, create);
booksRouter.delete(
  "/:bookId",
  destroyBookValidation,
  handleValidation,
  destroy,
);
booksRouter.patch("/:bookId", updateBookValidation, handleValidation, patch);
