/*
  Warnings:

  - You are about to drop the column `author` on the `books` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "books_title_author_key";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "author",
ADD COLUMN     "authors" TEXT[],
ADD COLUMN     "small_thumbnail" TEXT,
ADD COLUMN     "thumbnail" TEXT;
