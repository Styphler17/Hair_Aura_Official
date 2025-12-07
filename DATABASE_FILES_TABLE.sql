-- Optional: File tracking table
-- This table stores metadata about uploaded files for better management
-- You can run this SQL in phpMyAdmin to create the table

CREATE TABLE IF NOT EXISTS `uploaded_files` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `filename` VARCHAR(255) NOT NULL,
  `original_filename` VARCHAR(255) NOT NULL,
  `file_path` VARCHAR(500) NOT NULL,
  `file_url` VARCHAR(500) NOT NULL,
  `file_type` VARCHAR(50) NOT NULL,
  `file_size` BIGINT NOT NULL,
  `uploaded_by` VARCHAR(255) DEFAULT NULL, -- Optional: admin user ID
  `used_in` VARCHAR(50) DEFAULT NULL, -- Optional: 'product', 'settings', 'blog', etc.
  `reference_id` VARCHAR(255) DEFAULT NULL, -- Optional: product ID, settings ID, etc.
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_file_url` (`file_url`),
  INDEX `idx_used_in` (`used_in`, `reference_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

