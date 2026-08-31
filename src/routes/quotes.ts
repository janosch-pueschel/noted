import { Router } from "express";

import { handleValidation } from "../middleware/validation/handleValidation";
import {
  getQuoteByIdValidation,
  destroyQuoteValidation,
  createQuoteValidation,
} from "../middleware/validation/quoteValidation";
import {
  getAll,
  getById,
  destroy,
  create,
} from "../controllers/quotesController";

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

quotesRouter.post("/", createQuoteValidation, handleValidation, create);
