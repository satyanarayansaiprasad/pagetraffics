-- ===================================================
-- PageTraffics Hostinger MySQL Database Schema
-- Database Name: u865727365_pageTraffics
-- phpMyAdmin Import Ready
-- ===================================================

SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `uid` VARCHAR(255) NOT NULL UNIQUE,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `displayName` VARCHAR(255) DEFAULT '',
  `phone` VARCHAR(50) DEFAULT '',
  `role` VARCHAR(50) DEFAULT 'customer',
  `emailVerified` TINYINT(1) DEFAULT 1,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `projects`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `project_id` VARCHAR(255) NOT NULL UNIQUE,
  `user_uid` VARCHAR(255) NOT NULL,
  `customerEmail` VARCHAR(255) NOT NULL,
  `customerName` VARCHAR(255) DEFAULT '',
  `projectName` VARCHAR(255) NOT NULL,
  `businessName` VARCHAR(255) DEFAULT '',
  `description` TEXT,
  `requirements` TEXT,
  `budget` VARCHAR(100) DEFAULT '',
  `deadline` VARCHAR(100) DEFAULT '',
  `status` VARCHAR(100) DEFAULT 'Submitted',
  `meetingUrl` VARCHAR(500) DEFAULT '',
  `scheduledMeeting` JSON DEFAULT NULL,
  `acceptedPackage` JSON DEFAULT NULL,
  `pricingOptions` JSON DEFAULT NULL,
  `agreement` JSON DEFAULT NULL,
  `documents` JSON DEFAULT NULL,
  `notifications` JSON DEFAULT NULL,
  `paymentHistory` JSON DEFAULT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `support_tickets`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `support_tickets` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ticket_id` VARCHAR(255) NOT NULL UNIQUE,
  `user_uid` VARCHAR(255) NOT NULL,
  `customerEmail` VARCHAR(255) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) DEFAULT 'Technical Support',
  `priority` VARCHAR(50) DEFAULT 'Medium',
  `description` TEXT,
  `status` VARCHAR(50) DEFAULT 'Open',
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `inquiries`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `inquiry_id` VARCHAR(255) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) DEFAULT '',
  `subject` VARCHAR(255) DEFAULT '',
  `message` TEXT,
  `status` VARCHAR(50) DEFAULT 'New',
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
