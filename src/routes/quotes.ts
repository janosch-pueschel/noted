import { Router } from "express";

import { handleValidation } from "../middleware/validation/handleValidation";
import { getQuoteByIdValidation } from "../middleware/validation/quoteValidation";
import { getAll, getById } from "../controllers/quotesController";

export const quotesRouter = Router();

quotesRouter.get("/", getAll);
quotesRouter.get(
  "/:quoteId",
  getQuoteByIdValidation,
  handleValidation,
  getById,
);
