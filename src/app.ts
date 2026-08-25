import express from "express";

import { booksRouter } from "./routes/books";

const app = express();

app.use("/books", booksRouter);

app.get(/.*/, (req, res) => {
  res.status(404).send("404 not found");
});

export default app;
