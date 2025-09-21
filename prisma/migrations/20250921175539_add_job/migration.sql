-- CreateTable
CREATE TABLE `JOB_CATEGORY` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `JOB_CATEGORY_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `job_name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `time_open` VARCHAR(191) NOT NULL,
    `time_close` VARCHAR(191) NOT NULL,
    `job_type` ENUM('Full_time', 'Part_time', 'Intern', 'Contract', 'Freelancer') NOT NULL,
    `salary` VARCHAR(191) NOT NULL,
    `job_description` LONGTEXT NOT NULL,
    `number_of_recruitment` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `slug` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NULL,

    UNIQUE INDEX `Job_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `job` ADD CONSTRAINT `job_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `JOB_CATEGORY`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
