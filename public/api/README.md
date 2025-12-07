# API Endpoints for Hair Aura

This folder contains PHP API endpoints that connect your React frontend to the MySQL database on Hostinger.

## Setup Instructions

### 1. Database Configuration

**IMPORTANT**: Before using these endpoints, you must update `db_connect.php` with your actual Hostinger database credentials:

```php
$username = "u123456789_admin"; // Replace with YOUR Hostinger DB Username
$password = "YourStrongPassword!"; // Replace with YOUR Hostinger DB Password
$dbname = "u123456789_hairaura"; // Replace with YOUR Hostinger DB Name
```

### 2. Create Uploads Directory

On your Hostinger server, create an `uploads` folder in `public_html`:

1. Go to Hostinger File Manager
2. Navigate to `public_html`
3. Create a folder named `uploads`
4. Set permissions to **755** (or 777 if 755 doesn't work)

### 3. Available Endpoints

- **`get_products.php`** - Fetches all products from the database
- **`get_settings.php`** - Fetches site settings and social links
- **`get_blog_posts.php`** - Fetches blog posts (supports `?id=post_id` for single post)
- **`upload.php`** - Handles file uploads (images/videos) to the server

### 4. Testing

After deployment, test your endpoints:

- `https://your-domain.com/api/get_products.php`
- `https://your-domain.com/api/get_settings.php`
- `https://your-domain.com/api/get_blog_posts.php`

### 5. CORS Configuration

All endpoints include CORS headers to allow requests from your React frontend. If you need to restrict access, modify the `Access-Control-Allow-Origin` header in each file.

## Security Notes

- Never commit `db_connect.php` with real credentials to public repositories
- Consider using environment variables or a config file outside the web root
- Validate and sanitize all user inputs in production
- Use prepared statements for any endpoints that accept user input

