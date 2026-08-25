import express from "express";

import { getAll, getById } from "../controllers/booksController";

export const booksRouter = express.Router();

booksRouter.get("/", getAll);
booksRouter.get("/:bookId", getById);
