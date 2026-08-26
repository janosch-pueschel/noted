import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const book1984 = await prisma.book.upsert({
    where: {
      title_author: {
        title: "1984",
        author: "George Orwell",
      },
    },
    update: {},
    create: {
      title: "1984",
      author: "George Orwell",
    },
  });

  const bookAlchemist = await prisma.book.upsert({
    where: {
      title_author: {
        title: "Der Alchimist",
        author: "Paulo Coelho",
      },
    },
    update: {},
    create: {
      title: "Der Alchimist",
      author: "Paulo Coelho",
    },
  });

  const bookSiddhartha = await prisma.book.upsert({
    where: {
      title_author: {
        title: "Siddhartha",
        author: "Hermann Hesse",
      },
    },
    update: {},
    create: {
      title: "Siddhartha",
      author: "Hermann Hesse",
    },
  });

  await prisma.quote.createMany({
    data: [
      {
        text: "Big Brother is watching you.",
        page: 3,
        bookId: book1984.id,
      },
      {
        text: "War is peace. Freedom is slavery. Ignorance is strength.",
        page: 4,
        bookId: book1984.id,
      },
      {
        text: "Every person has a unique path to follow.",
        page: 27,
        bookId: bookAlchemist.id,
      },
      {
        text: "Dreams can point us toward what truly matters.",
        page: 41,
        bookId: bookAlchemist.id,
      },
      {
        text: "Wisdom cannot simply be taught; it must be experienced.",
        page: 18,
        bookId: bookSiddhartha.id,
      },
      {
        text: "The search for meaning is ultimately a personal journey.",
        page: 52,
        bookId: bookSiddhartha.id,
      },
    ],
    skipDuplicates: true,
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
