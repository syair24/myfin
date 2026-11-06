/*
  Warnings:

  - You are about to drop the column `emailVerifiedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `pending_registrations` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailVerifiedAt";

-- DropTable
DROP TABLE "pending_registrations";
