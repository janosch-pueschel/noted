import { Request, Response } from "express";

import { prisma } from "../db/prismaClient";

export async function getBooks(req: Request, res: Response) {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch books" });
  }
}
