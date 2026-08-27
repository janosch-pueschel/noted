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

export async function getById(req: Request, res: Response) {
  const quoteId = Number(req.params.quoteId);

  try {
    const quote = await prisma.quote.findUnique({
      where: { id: quoteId },
    });

    if (!quote) {
      return res.status(404).json({
        message: "Quote not found.",
      });
    }

    res.json(quote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch quote." });
  }
}
