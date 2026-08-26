import { Router } from "express";

import { getAll } from "../controllers/quotesController";

export const quotesRouter = Router();

quotesRouter.get("/", getAll);
