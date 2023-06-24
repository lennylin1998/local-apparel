/*
  Warnings:

  - The primary key for the `LikedProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `LikedProduct` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `LikedProduct` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `LikedProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `LikedProduct` DROP FOREIGN KEY `LikedProduct_userid_fkey`;

-- AlterTable
ALTER TABLE `LikedProduct` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `userid`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`user_id`, `product_id`);

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `shortDescription` TEXT NULL;

-- AddForeignKey
ALTER TABLE `LikedProduct` ADD CONSTRAINT `LikedProduct_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
