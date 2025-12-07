
# Hair Aura Database Schema

This document outlines the MySQL database structure required to backend the Hair Aura application.

## 1. Users Table
Stores admin access credentials and roles.

```sql
CREATE TABLE `admin_users` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL, -- Should be hashed in production
  `role` ENUM('Super Admin', 'Editor', 'Viewer') DEFAULT 'Editor',
  `avatar` LONGTEXT, -- Base64 string or URL
  `last_login` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## 2. Products Table
Stores the inventory data.

```sql
CREATE TABLE `products` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `description` TEXT,
  `image` TEXT, -- Main image URL
  `images` JSON, -- Array of additional image URLs
  `category` ENUM('wigs', 'bundles', 'closures') NOT NULL,
  `tags` JSON, -- Array of visual tags e.g. ["Best Seller", "HD Lace"]
  `seo_keywords` TEXT, -- Comma separated keywords
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## 3. Site Settings Table
Stores global configuration. Usually contains a single row.

```sql
CREATE TABLE `site_settings` (
  `id` INT NOT NULL DEFAULT 1,
  `phone_number` VARCHAR(50),
  `address` VARCHAR(255),
  `currency_symbol` VARCHAR(10) DEFAULT 'GH₵',
  
  -- Branding
  `color_text` VARCHAR(7) DEFAULT '#0a0a0a',
  `color_background` VARCHAR(7) DEFAULT '#ffffff',
  `color_accent` VARCHAR(7) DEFAULT '#D4AF37',
  `logo` LONGTEXT,
  `favicon` LONGTEXT,
  `default_social_image` LONGTEXT,
  
  -- Homepage Hero Config
  `hero_image` TEXT,
  `hero_headline` VARCHAR(255),
  `hero_subheadline` TEXT,
  `hero_cta_text` VARCHAR(50),
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## 4. Social Links Table
Stores dynamic social media links linked to the settings.

```sql
CREATE TABLE `social_links` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `settings_id` INT NOT NULL,
  `platform` ENUM('TikTok', 'Instagram', 'Facebook', 'Twitter', 'YouTube', 'Snapchat') NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  FOREIGN KEY (`settings_id`) REFERENCES `site_settings`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## 5. Blog Posts Table
Stores the journal/blog entries.

```sql
CREATE TABLE `blog_posts` (
  `id` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `excerpt` TEXT,
  `content` LONGTEXT,
  `image` TEXT,
  `author` VARCHAR(100),
  `date` DATETIME NOT NULL,
  `seo_description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## 6. Indexes & Optimization
```sql
CREATE INDEX idx_product_category ON products(category);
CREATE INDEX idx_product_price ON products(price);
CREATE INDEX idx_blog_date ON blog_posts(date);
```
