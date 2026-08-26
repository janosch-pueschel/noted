import { Router } from "express";

import {
  createBookValidation,
  getBookByIdValidation,
  destroyBookValidation,
  updateBookValidation,
} from "../middleware/validation/bookValidation";
import { handleValidation } from "../middleware/validation/handleValidation";
import {
  getAll,
  getById,
  create,
  destroy,
  patch,
} from "../controllers/booksController";

export const booksRouter = Router();

booksRouter.get("/", getAll);
booksRouter.get("/:bookId", getBookByIdValidation, handleValidation, getById);
booksRouter.post("/", createBookValidation, handleValidation, create);
booksRouter.delete(
  "/:bookId",
  destroyBookValidation,
  handleValidation,
  destroy,
);
booksRouter.patch("/:bookId", updateBookValidation, handleValidation, patch);
