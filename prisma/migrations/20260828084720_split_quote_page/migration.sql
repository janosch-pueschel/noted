-- AlterTable
ALTER TABLE "quotes" RENAME COLUMN "page" TO "start_page";
ALTER TABLE "quotes" ADD COLUMN "end_page" INTEGER;
