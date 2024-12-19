/*
  Warnings:

  - The `status` column on the `Party` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PartyStatus" AS ENUM ('PLANNING', 'PLANNED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Party" DROP COLUMN "status",
ADD COLUMN     "status" "PartyStatus" NOT NULL DEFAULT 'PLANNING';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "status",
ADD COLUMN     "password" TEXT NOT NULL;

-- DropEnum
DROP TYPE "PartyStats";
