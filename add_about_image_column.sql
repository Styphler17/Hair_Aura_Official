-- Migration: Add about_image column to site_settings table
-- Run this SQL command on your database

ALTER TABLE `site_settings` 
ADD COLUMN `about_image` LONGTEXT AFTER `about_content`;
