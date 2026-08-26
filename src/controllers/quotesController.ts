import { Request, Response } from "express";

import { prisma } from "../db/prismaClient";

export async function getAll(req: Request, res: Response) {
  try {
    const quotes = await prisma.quote.findMany();

    res.json(quotes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch quotes." });
  }
}
