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
  const bookId = Number(req.params.bookId);

  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch book." });
  }
}

export async function create(req: Request, res: Response) {
  const { title, author } = req.body;

  try {
    const book = await prisma.book.create({
      data: { title: title, author: author },
    });
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create book." });
  }
}

export async function destroy(req: Request, res: Response) {
  const bookId = Number(req.params.bookId);

  try {
    await prisma.book.delete({
      where: { id: bookId },
    });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete book." });
  }
}
