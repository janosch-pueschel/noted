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

export async function destroy(req: Request, res: Response) {
  const quoteId = Number(req.params.quoteId);

  try {
    await prisma.quote.delete({
      where: {
        id: quoteId,
      },
    });

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete quote." });
  }
}

interface CreateQuoteData {
  text: string;
  startPage?: number;
  endPage?: number;
  bookId: number;
}

export async function create(req: Request, res: Response) {
  const { text, startPage, endPage, bookId } = req.body;

  let data: CreateQuoteData = { text, bookId };

  if (startPage !== undefined) {
    data.startPage = startPage;
  }

  if (endPage !== undefined) {
    data.endPage = endPage;
  }

  console.log(data);

  try {
    const quote = await prisma.quote.create({
      data,
    });

    res.status(201).json(quote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create quote." });
  }
}
