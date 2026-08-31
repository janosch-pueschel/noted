import { param, body } from "express-validator";

export const getQuoteByIdValidation = [
  param("quoteId").isInt().withMessage("Quote ID has to be a number"),
];

export const destroyQuoteValidation = [
  param("quoteId").isInt().withMessage("Quote ID has to be a number"),
];

export const createQuoteValidation = [
  body("text").trim().notEmpty().withMessage("Quote text is required"),

  body("startPage")
    .optional()
    .trim()
    .isInt({ min: 1 })
    .withMessage("Start page number for quote has to be a number")
    .toInt(),

  body("endPage")
    .optional()
    .trim()
    .isInt({ min: 1 })
    .withMessage("End page number for quote has to be a number")
    .toInt()
    .custom((endPage, { req }) => {
      const startPage = req.body.startPage;

      if (startPage !== undefined && endPage <= startPage) {
        throw new Error(
          "End page number has to be higher than start page number.",
        );
      }

      return true;
    }),

  body("bookId")
    .trim()
    .isInt({ min: 1 })
    .withMessage("Book ID has to be a number")
    .toInt(),

  body().custom((body) => {
    const startPage = body.startPage;
    const endPage = body.endPage;

    if (startPage === undefined && endPage !== undefined) {
      throw new Error(
        "If end page is provided start page has to be provided as well.",
      );
    }

    return true;
  }),
];

export const patchQuoteValidation = [
  param("quoteId")
    .isInt()
    .withMessage("Quote ID has to be a positive integer"),

  body("text")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Quote text is required"),

  body("startPage")
    .optional({ values: "null" })
    .trim()
    .isInt({ min: 1 })
    .withMessage("Start page number has to be a positive integer")
    .toInt(),

  body("endPage")
    .optional({ values: "null" })
    .trim()
    .isInt({ min: 1 })
    .withMessage("End page number has to be a positive integer")
    .toInt(),

  body("bookId")
    .optional()
    .trim()
    .isInt({ min: 1 })
    .withMessage("Book ID has to be a positive integer")
    .toInt(),
];
