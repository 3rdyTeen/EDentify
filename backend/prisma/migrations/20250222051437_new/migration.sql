/*
  Warnings:

  - You are about to drop the column `firstname` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Users` table. All the data in the column will be lost.
  - Added the required column `name` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Users` DROP COLUMN `firstname`,
    DROP COLUMN `lastname`,
    ADD COLUMN `confirmation_code` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
