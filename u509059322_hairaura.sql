-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 07, 2025 at 02:42 PM
-- Server version: 11.8.3-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u509059322_hairaura`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Super Admin','Editor','Viewer') DEFAULT 'Editor',
  `avatar` longtext DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `name`, `email`, `password`, `role`, `avatar`, `last_login`, `created_at`) VALUES
('1', 'Super Admin', 'admin@hairaura.com', 'admin123', 'Super Admin', '', '2025-12-07 14:35:46', '2025-12-07 14:35:46');

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `image` text DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `date` datetime NOT NULL,
  `seo_description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `title`, `excerpt`, `content`, `image`, `author`, `date`, `seo_description`, `created_at`, `updated_at`) VALUES
('1', 'The Ultimate Guide to Maintaining HD Lace', 'Learn the secrets to keeping your lace melted and undetectable for weeks.', 'HD Lace is known for its delicate nature and high transparency, making it the top choice for a flawless install. However, to keep it looking fresh, you need to avoid heavy oils and excessive glue. Clean the lace gently with alcohol every few days to remove buildup...', 'https://picsum.photos/id/1027/800/600', 'Aura Stylist', '2025-12-07 14:35:47', 'Expert tips on maintaining HD lace wigs for longevity and a natural look.', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('2', 'Virgin vs. Raw Hair: What is the Difference?', 'Confused about hair grades? We break down the differences between processed virgin hair and authentic raw donor hair.', 'When shopping for luxury extensions, the terms Virgin and Raw are often used interchangeably, but they are quite different. Raw hair is completely unprocessed, meaning it comes directly from a donor without chemical alterations. Virgin hair may be steam processed to achieve specific curl patterns...', 'https://picsum.photos/id/64/800/600', 'Hair Aura Team', '2025-12-05 14:35:47', 'Understand the difference between Virgin hair and Raw hair before you buy.', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('3', '5 Summer Styles for the Accra Heat', 'Beat the humidity with these breathable, chic styles perfect for the Ghanaian weather.', 'Accra heat is no joke, and wearing a heavy wig can be uncomfortable. We recommend glueless closures for breathability, or a short bob cut to keep hair off your neck. Our body wave bundles also hold up well in humidity without frizzing excessively...', 'https://picsum.photos/id/338/800/600', 'Aura Stylist', '2025-12-02 14:35:47', 'Best wig styles for hot weather in Ghana.', '2025-12-07 14:35:47', '2025-12-07 14:35:47');

-- --------------------------------------------------------

--
-- Table structure for table `drafts`
--

CREATE TABLE `drafts` (
  `id` varchar(255) NOT NULL,
  `type` enum('product','blog') NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`content`)),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `category` enum('wigs','bundles','closures') NOT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `colors` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`colors`)),
  `seo_keywords` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `image`, `images`, `category`, `tags`, `colors`, `seo_keywords`, `created_at`, `updated_at`) VALUES
('1', 'Silky Straight 13x4 HD Lace Wig', 3500.00, 'Bone straight, high definition lace that melts into your skin. 100% Virgin Human Hair.', 'https://picsum.photos/id/64/800/800', '[\"https://picsum.photos/id/64/800/800\", \"https://picsum.photos/id/65/800/800\", \"https://picsum.photos/id/66/800/800\"]', 'wigs', '[\"Best Seller\", \"HD Lace\"]', '[\"Natural Black\", \"Jet Black\"]', 'straight wig, bone straight, ghana wigs, hd lace accra', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('2', 'Body Wave Bundles (3pcs)', 2200.00, 'Luxurious S-pattern waves that hold curls for days. Full cuticle aligned.', 'https://picsum.photos/id/338/800/800', '[\"https://picsum.photos/id/338/800/800\", \"https://picsum.photos/id/339/800/800\"]', 'bundles', '[\"Bundle Deal\"]', '[\"Natural Black\", \"Dark Brown\"]', 'body wave, hair bundles, virgin hair ghana', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('3', 'Deep Curly Frontal Wig', 3800.00, 'Tight, bouncy curls for a voluminous look. Minimal shedding and tangling.', 'https://picsum.photos/id/129/800/800', '[\"https://picsum.photos/id/129/800/800\", \"https://picsum.photos/id/130/800/800\"]', 'wigs', '[\"Vacation Ready\"]', '[\"Natural Black\"]', 'curly wig, deep wave, frontal wig', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('4', 'Russian Blonde 613 Bundles', 2800.00, 'Pre-bleached platinum blonde bundles. Ready to dye any color.', 'https://picsum.photos/id/22/800/800', '[\"https://picsum.photos/id/22/800/800\", \"https://picsum.photos/id/23/800/800\"]', 'bundles', '[\"613 Blonde\"]', '[\"613 Blonde\"]', 'blonde hair, 613 bundles, platinum hair accra', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('5', '5x5 Transparent Closure', 1200.00, 'Perfect for glueless installs. Thin lace for a natural hairline.', 'https://picsum.photos/id/1005/800/800', '[\"https://picsum.photos/id/1005/800/800\"]', 'closures', '[\"Beginner Friendly\"]', '[\"Natural Black\", \"Dark Brown\", \"613 Blonde\"]', 'closure, 5x5 closure, transparent lace', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('6', 'Kinky Straight Clip-ins', 1500.00, 'Matches natural blown-out 4C hair texture perfectly. Seamless blend.', 'https://picsum.photos/id/331/800/800', '[\"https://picsum.photos/id/331/800/800\"]', 'bundles', '[\"Natural Texture\"]', '[\"Natural Black\"]', 'kinky straight, clip ins, natural hair extensions', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('7', 'Raw Burmese Curly Wig', 4500.00, 'Authentic raw hair with a natural luster and coarse curly texture.', 'https://picsum.photos/id/342/800/800', '[\"https://picsum.photos/id/342/800/800\"]', 'wigs', '[\"Raw Hair\"]', '[\"Natural Black\"]', 'burmese hair, curly wig, raw hair ghana', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('8', 'Piano Highlight Bob', 2000.00, 'Chic blunt cut bob with honey blonde highlights.', 'https://picsum.photos/id/433/800/800', '[\"https://picsum.photos/id/433/800/800\"]', 'wigs', '[\"Short Style\"]', '[\"Piano Highlight (P4/27)\"]', 'bob wig, highlighted hair, piano color', '2025-12-07 14:35:47', '2025-12-07 14:35:47');

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL DEFAULT 1,
  `phone_number` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `currency_symbol` varchar(10) DEFAULT 'GH₵',
  `color_text` varchar(7) DEFAULT '#0a0a0a',
  `color_background` varchar(7) DEFAULT '#ffffff',
  `color_accent` varchar(7) DEFAULT '#D4AF37',
  `logo` longtext DEFAULT NULL,
  `favicon` longtext DEFAULT NULL,
  `default_social_image` longtext DEFAULT NULL,
  `hero_image` text DEFAULT NULL,
  `hero_headline` varchar(255) DEFAULT NULL,
  `hero_subheadline` text DEFAULT NULL,
  `hero_cta_text` varchar(50) DEFAULT NULL,
  `about_title` varchar(255) DEFAULT 'Our Story',
  `about_content` text DEFAULT NULL,
  `contact_title` varchar(255) DEFAULT 'Get in Touch',
  `contact_content` text DEFAULT NULL,
  `maintenance_mode` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `phone_number`, `address`, `currency_symbol`, `color_text`, `color_background`, `color_accent`, `logo`, `favicon`, `default_social_image`, `hero_image`, `hero_headline`, `hero_subheadline`, `hero_cta_text`, `about_title`, `about_content`, `contact_title`, `contact_content`, `maintenance_mode`) VALUES
(1, '233508007873', 'Odumase GA West Accra, Ghana', 'GH₵', '#0a0a0a', '#ffffff', '#D4AF37', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 500 150\'%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'serif\' font-size=\'60\' fill=\'%230a0a0a\'%3EHAIR AURA%3C/text%3E%3C/svg%3E', 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✨</text></svg>', 'https://picsum.photos/id/325/1920/1080', 'https://picsum.photos/id/325/1920/1080', 'Unleash Your Inner Aura', 'Experience the pinnacle of luxury with our ethically sourced, cuticle-aligned hair extensions. Served exclusively in Accra.', 'Shop Now', 'Our Story', 'Hair Aura was born from a desire to bring uncompromising quality to the hair extension market. We noticed a gap between high-end promises and actual product longevity. Our mission became clear: source only the finest raw virgin hair, ensuring that every bundle, wig, and closure meets our rigorous standards of excellence.\n\nWe believe that hair is an accessory that should empower you. Whether you are looking for a professional sleek look or vacation curls, our collection is curated to enhance your natural beauty without the hassle of tangling or shedding.', 'Get in Touch', 'We operate exclusively online and via WhatsApp to ensure a personalized luxury experience for our clients in Ghana. Connect with us directly for consultations and orders.', 0);

-- --------------------------------------------------------

--
-- Table structure for table `social_links`
--

CREATE TABLE `social_links` (
  `id` int(11) NOT NULL,
  `settings_id` int(11) NOT NULL,
  `platform` enum('TikTok','Instagram','Facebook','Twitter','YouTube','Snapchat') NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `social_links`
--

INSERT INTO `social_links` (`id`, `settings_id`, `platform`, `url`) VALUES
(1, 1, 'TikTok', 'https://www.tiktok.com/@hair_aura_official'),
(2, 1, 'Instagram', 'https://instagram.com/hair_aura_official');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_blog_date` (`date`);

--
-- Indexes for table `drafts`
--
ALTER TABLE `drafts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product_category` (`category`),
  ADD KEY `idx_product_price` (`price`);

--
-- Indexes for table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_links`
--
ALTER TABLE `social_links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `settings_id` (`settings_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `social_links`
--
ALTER TABLE `social_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `social_links`
--
ALTER TABLE `social_links`
  ADD CONSTRAINT `social_links_ibfk_1` FOREIGN KEY (`settings_id`) REFERENCES `site_settings` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
