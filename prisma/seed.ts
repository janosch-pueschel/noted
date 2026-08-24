import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.book.upsert({
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

  await prisma.book.upsert({
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

  await prisma.book.upsert({
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
