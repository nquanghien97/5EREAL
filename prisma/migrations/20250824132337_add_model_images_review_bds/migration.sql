-- CreateTable
CREATE TABLE `images_review_bds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `coordinatesId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `images_review_bds` ADD CONSTRAINT `images_review_bds_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `images_review_bds` ADD CONSTRAINT `images_review_bds_coordinatesId_fkey` FOREIGN KEY (`coordinatesId`) REFERENCES `coordinates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
