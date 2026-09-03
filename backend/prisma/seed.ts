import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.quote.deleteMany();
  await prisma.book.deleteMany();

  const book1984 = await prisma.book.create({
    data: {
      title: "1984",
      authors: ["George Orwell"],
    },
  });

  const bookAlchemist = await prisma.book.create({
    data: {
      title: "Der Alchimist",
      authors: ["Paulo Coelho"],
      thumbnail:
        "http://books.google.com/books/content?id=-0wUnwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      thumbnailSmall:
        "http://books.google.com/books/content?id=-0wUnwEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    },
  });

  const bookSiddhartha = await prisma.book.create({
    data: {
      title: "Siddhartha",
      authors: ["Hermann Hesse"],
      thumbnail:
        "http://books.google.com/books/content?id=f2xnKDdbdy8C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      thumbnailSmall:
        "http://books.google.com/books/content?id=f2xnKDdbdy8C&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    },
  });

  await prisma.quote.createMany({
    data: [
      {
        text: "Big Brother is watching you.",
        startPage: 3,
        bookId: book1984.id,
      },
      {
        text: "War is peace. Freedom is slavery. Ignorance is strength.",
        startPage: 4,
        bookId: book1984.id,
      },
      {
        text: "Every person has a unique path to follow.",
        startPage: 27,
        bookId: bookAlchemist.id,
      },
      {
        text: "Dreams can point us toward what truly matters.",
        startPage: 41,
        bookId: bookAlchemist.id,
      },
      {
        text: "Wisdom cannot simply be taught; it must be experienced.",
        startPage: 18,
        bookId: bookSiddhartha.id,
      },
      {
        text: "The search for meaning is ultimately a personal journey.",
        startPage: 52,
        bookId: bookSiddhartha.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
