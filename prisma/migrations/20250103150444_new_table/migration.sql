/*
  Warnings:

  - Added the required column `adminId` to the `Party` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PartyHostType" AS ENUM ('CLOSEST', 'RANDOM', 'CHOOSE');

-- AlterTable
ALTER TABLE "Party" ADD COLUMN     "adminId" TEXT NOT NULL,
ADD COLUMN     "hostType" "PartyHostType" DEFAULT 'CLOSEST';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Party" ADD CONSTRAINT "Party_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
