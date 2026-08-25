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
