import express from "express";

import { createBookValidation } from "../middleware/createBookValidation";
import { handleValidation } from "../middleware/handleValidation";
import { getAll, getById, create } from "../controllers/booksController";

export const booksRouter = express.Router();

booksRouter.get("/", getAll);
booksRouter.get("/:bookId", getById);
booksRouter.post("/", createBookValidation, handleValidation, create);
