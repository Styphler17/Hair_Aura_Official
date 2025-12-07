# Hair Aura - Luxury Hair e-Commerce App

A premium single-page application (SPA) for Hair Aura, built with React and Tailwind CSS.

## 🚀 Deployment Guide

### Option 1: Deploying to Hostinger (Apache/cPanel)
Since this is a Single Page Application (SPA), all requests must be redirected to `index.html`.

1.  **Build the Project**:
    If you are using a build tool, run `npm run build`. If you are using the raw files provided by the AI:
    - Ensure all files are in the `public_html` (or your subdomain folder).

2.  **Upload Files**:
    - Upload `index.html`, `index.tsx` (compiled to JS), and all assets to your Hostinger File Manager.
    - **IMPORTANT**: Upload the `.htaccess` file provided in the `public/` folder to the root of your site. This handles the routing so that refreshing a page like `your-site.com/shop` doesn't give a 404 error.

3.  **Database**:
    - Currently, the app uses **LocalStorage** (browser memory) to simulate a database. This means:
        - Changes made in the Admin Panel are saved to *your* browser.
        - To make changes visible to *everyone*, you must currently edit the code in `constants.ts` or implement a real Backend API (Node/PHP).
    - **To Move to a Real MySQL Database**:
        1. Create a MySQL Database in Hostinger.
        2. Import the `db_schema.sql` file provided in the source code.
        3. You will need to hire a backend developer to convert the `productService.ts` and `authController.ts` files to fetch data from a PHP or Node.js API instead of LocalStorage.

### Option 2: Deploying to Netlify (Recommended for Frontend)
1.  **Upload**: Drag and drop your project folder into Netlify.
2.  **Routing**: Ensure the `_redirects` file provided in the `public/` folder is included in the upload. This fixes page refresh issues.

## 🔑 Admin Access
- **URL**: Click "Staff Access" in the footer.
- **Default Password**: `admin123`

## 🎨 Customization
- **Logo/Colors**: Go to Admin Dashboard > Site Settings.
- **Hero Image**: Can be updated in Site Settings.

## 📦 Features
- **WhatsApp Checkout**: Orders are sent directly to WhatsApp.
- **Wishlist & Cart**: Local storage based.
- **SEO Optimized**: Dynamic meta tags and JSON-LD Schema for Google.
