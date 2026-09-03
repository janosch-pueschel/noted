import express from "express";
import cors from "cors";

import { booksRouter } from "./routes/books";
import { quotesRouter } from "./routes/quotes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use("/books", booksRouter);
app.use("/quotes", quotesRouter);

app.get(/.*/, (req, res) => {
  res.status(404).send("404 not found");
});

export default app;
