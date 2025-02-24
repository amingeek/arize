/*
  Warnings:

  - You are about to alter the column `face` on the `NewPerson` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `NewPerson` MODIFY `face` VARCHAR(191) NOT NULL;
