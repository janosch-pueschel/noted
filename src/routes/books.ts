import express from "express";

import {
  createBookValidation,
  getBookByIdValidation,
} from "../middleware/validation/bookValidation";
import { handleValidation } from "../middleware/validation/handleValidation";
import { getAll, getById, create } from "../controllers/booksController";

export const booksRouter = express.Router();

booksRouter.get("/", getAll);
booksRouter.get("/:bookId", getBookByIdValidation, handleValidation, getById);
booksRouter.post("/", createBookValidation, handleValidation, create);
