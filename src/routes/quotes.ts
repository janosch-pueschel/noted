import { Router } from "express";

import { handleValidation } from "../middleware/validation/handleValidation";
import {
  getQuoteByIdValidation,
  destroyQuoteValidation,
} from "../middleware/validation/quoteValidation";
import { getAll, getById, destroy } from "../controllers/quotesController";

export const quotesRouter = Router();

quotesRouter.get("/", getAll);
quotesRouter.get(
  "/:quoteId",
  getQuoteByIdValidation,
  handleValidation,
  getById,
);

quotesRouter.delete(
  "/:quoteId",
  destroyQuoteValidation,
  handleValidation,
  destroy,
);
