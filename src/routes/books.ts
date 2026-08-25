import express from "express";

import {
  createBookValidation,
  getBookByIdValidation,
  destroyBookValidation,
} from "../middleware/validation/bookValidation";
import { handleValidation } from "../middleware/validation/handleValidation";
import {
  getAll,
  getById,
  create,
  destroy,
} from "../controllers/booksController";

export const booksRouter = express.Router();

booksRouter.get("/", getAll);
booksRouter.get("/:bookId", getBookByIdValidation, handleValidation, getById);
booksRouter.post("/", createBookValidation, handleValidation, create);
booksRouter.delete("/:bookId", destroyBookValidation, handleValidation, destroy);
