import express from "express";

import { getBooks } from "../controllers/booksController";

export const booksRouter = express.Router();

booksRouter.get("/", getBooks);
