import { Request, Response } from "express";

import { prisma } from "../db/prismaClient";

export async function getAll(req: Request, res: Response) {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch books." });
  }
}

export async function getById(req: Request, res: Response) {
  const { bookId } = req.params;

  if (isNaN(Number(bookId))) {
    return res
      .status(404)
      .json({ message: "Failed to fetch book. Invalid book id." });
  }

  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(bookId) },
    });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch book." });
  }
}
