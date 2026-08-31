import { Router } from "express";

import { handleValidation } from "../middleware/validation/handleValidation";
import {
  getQuoteByIdValidation,
  destroyQuoteValidation,
  createQuoteValidation,
  patchQuoteValidation,
} from "../middleware/validation/quoteValidation";
import {
  getAll,
  getById,
  destroy,
  create,
  patch,
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

quotesRouter.patch("/:quoteId", patchQuoteValidation, handleValidation, patch);

quotesRouter.post("/", createQuoteValidation, handleValidation, create);
