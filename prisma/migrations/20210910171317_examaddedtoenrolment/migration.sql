/*
  Warnings:

  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_userId_fkey";

-- AlterTable
ALTER TABLE "Enrolment" ADD COLUMN     "mark" TEXT;

-- DropTable
DROP TABLE "Exam";
