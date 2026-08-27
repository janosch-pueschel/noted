import { param } from "express-validator";

export const getQuoteByIdValidation = [
  param("quoteId").isInt().withMessage("Quote ID has to be a number"),
];

export const destroyQuoteValidation = [
  param("quoteId").isInt().withMessage("Quote ID has to be a number"),
];