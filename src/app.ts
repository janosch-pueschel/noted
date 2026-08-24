import express from "express";

import { booksRouter } from "./routes/books";

const app = express();

app.use("/books", booksRouter);

export default app;
