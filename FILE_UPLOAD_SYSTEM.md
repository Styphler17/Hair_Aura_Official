# File Upload System Documentation

## Overview
Files are now uploaded to the server and stored in the `/uploads/` directory. The file URLs are saved in the database in the respective tables (products, site_settings, blog_posts).

## How It Works

### 1. File Upload Flow

1. **User selects file** in AdminProducts or AdminSettings
2. **File is validated** (type, size)
3. **File is uploaded** to server via `upload.php` API endpoint
4. **File is saved** to `/uploads/` folder on server
5. **File URL is returned** (e.g., `https://hair-aura.debesties.com/uploads/aura_123456.jpg`)
6. **URL is stored** in database (products.image, products.images, site_settings.logo, etc.)

### 2. File Storage Locations

#### Server File System
- **Path**: `/public_html/uploads/` (on Hostinger server)
- **URL**: `https://hair-aura.debesties.com/uploads/filename.jpg`
- Files are saved with unique names: `aura_[timestamp].[extension]`

#### Database Storage
- **Products**: `products.image` (TEXT) and `products.images` (JSON array)
- **Settings**: `site_settings.logo`, `site_settings.favicon`, `site_settings.hero_image`, `site_settings.default_social_image` (all LONGTEXT)
- **Blog Posts**: `blog_posts.image` (TEXT)

### 3. Optional File Tracking Table

An optional `uploaded_files` table can be created to track all uploaded files:

```sql
CREATE TABLE `uploaded_files` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `filename` VARCHAR(255) NOT NULL,
  `original_filename` VARCHAR(255) NOT NULL,
  `file_path` VARCHAR(500) NOT NULL,
  `file_url` VARCHAR(500) NOT NULL,
  `file_type` VARCHAR(50) NOT NULL,
  `file_size` BIGINT NOT NULL,
  `uploaded_by` VARCHAR(255) DEFAULT NULL,
  `used_in` VARCHAR(50) DEFAULT NULL, -- 'product', 'settings', 'blog'
  `reference_id` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**To enable file tracking:**
1. Run the SQL in `DATABASE_FILES_TABLE.sql` in phpMyAdmin
2. The `upload.php` script will automatically save file metadata when the table exists

### 4. API Endpoints

#### `POST /api/upload.php`
Uploads a file to the server.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: `file` (File object)

**Optional Parameters:**
- `used_in`: 'product', 'settings', 'blog'
- `reference_id`: ID of the product/settings/blog post

**Response:**
```json
{
  "url": "https://hair-aura.debesties.com/uploads/aura_123456.jpg",
  "filename": "aura_123456.jpg",
  "path": "../uploads/aura_123456.jpg"
}
```

### 5. Frontend Services

#### `services/uploadService.ts`
- `uploadFile(file: File)`: Uploads a single file
- `uploadFiles(files: File[])`: Uploads multiple files

**Usage:**
```typescript
import { uploadFile } from '../services/uploadService';

const fileUrl = await uploadFile(file);
// Returns: "https://hair-aura.debesties.com/uploads/aura_123456.jpg"
```

### 6. Updated Components

#### `components/AdminProducts.tsx`
- Now uploads files to server instead of converting to Base64
- Stores URLs in `products.images` (JSON array) and `products.image` (TEXT)

#### `components/AdminSettings.tsx`
- Now uploads files to server instead of converting to Base64
- Stores URLs in `site_settings.logo`, `site_settings.favicon`, etc.

## File Paths Summary

| Location | Path | Database Field |
|----------|------|----------------|
| Server Directory | `/public_html/uploads/` | N/A (physical storage) |
| Product Main Image | `https://hair-aura.debesties.com/uploads/...` | `products.image` |
| Product Additional Images | `https://hair-aura.debesties.com/uploads/...` | `products.images` (JSON) |
| Site Logo | `https://hair-aura.debesties.com/uploads/...` | `site_settings.logo` |
| Site Favicon | `https://hair-aura.debesties.com/uploads/...` | `site_settings.favicon` |
| Hero Image | `https://hair-aura.debesties.com/uploads/...` | `site_settings.hero_image` |
| Social Share Image | `https://hair-aura.debesties.com/uploads/...` | `site_settings.default_social_image` |
| Blog Post Image | `https://hair-aura.debesties.com/uploads/...` | `blog_posts.image` |

## Setup Instructions

1. **Create uploads directory on server:**
   - Navigate to `public_html` in Hostinger File Manager
   - Create folder named `uploads`
   - Set permissions to **755** (or 777 if needed)

2. **Deploy API files:**
   - Upload `public/api/upload.php` to `public_html/api/`
   - Ensure `db_connect.php` has correct database credentials

3. **Optional: Create file tracking table:**
   - Run `DATABASE_FILES_TABLE.sql` in phpMyAdmin
   - This enables automatic file metadata tracking

## Benefits

✅ **Files stored on server** - Better performance, no LocalStorage limits  
✅ **URLs in database** - Easy to query and manage  
✅ **Unique filenames** - Prevents conflicts  
✅ **File tracking** - Optional metadata table for management  
✅ **Scalable** - Can handle large files and many uploads  

## Migration Notes

- Old Base64 data URLs in LocalStorage will still work but won't be used for new uploads
- Existing products/settings with Base64 images will continue to display
- New uploads will use server URLs stored in database

