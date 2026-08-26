import { body, param } from "express-validator";

export const createBookValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 255 })
    .withMessage("Title must not exceed 255 characters"),

  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required")
    .isLength({ max: 255 })
    .withMessage("Author must not exceed 255 characters"),
];

export const getBookByIdValidation = [
  param("bookId").isInt().withMessage("Book ID has to be a number"),
];

export const destroyBookValidation = [
  param("bookId").isInt().withMessage("Book ID has to be a number"),
];

export const updateBookValidation = [
  param("bookId").notEmpty().isInt().withMessage("Book ID has to be a number"),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title must not be empty")
    .isLength({ max: 255 })
    .withMessage("Title must not exceed 255 characters"),

  body("author")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Author must not be empty")
    .isLength({ max: 255 })
    .withMessage("Author must not exceed 255 characters"),

  body().custom((body) => {
    if (body.title === undefined && body.author === undefined) {
      throw new Error("At least one field must be provided");
    }

    return true;
  }),
];
