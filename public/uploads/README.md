# Uploads Directory

This directory stores uploaded files (images, videos) for the Hair Aura application.

## Server Setup

**IMPORTANT**: On your Hostinger server, you must create this folder manually:

1. Navigate to `public_html` in Hostinger File Manager
2. Create a folder named `uploads`
3. Set folder permissions to **755** (or 777 if 755 doesn't work, but 755 is safer)

## File Storage

- **Location on server**: `/public_html/uploads/`
- **Public URL**: `https://hair-aura.debesties.com/uploads/filename.jpg`
- **File naming**: Files are automatically renamed to `aura_[timestamp].[extension]` to prevent conflicts

## Notes

- The PHP script (`api/upload.php`) will attempt to create this folder automatically if it doesn't exist
- However, it's recommended to create it manually with proper permissions
- This folder should NOT be committed to git (add to .gitignore)
- Keep this folder for local development reference only

