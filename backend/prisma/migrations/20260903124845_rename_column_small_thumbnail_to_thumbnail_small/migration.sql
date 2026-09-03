/*
  Warnings:

  - You are about to drop the column `small_thumbnail` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "small_thumbnail",
ADD COLUMN     "thumbnail_small" TEXT;
