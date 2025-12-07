# Hair Aura - Luxury Hair e-Commerce App

A premium single-page application (SPA) for Hair Aura, built with React and Tailwind CSS.

## 🛠️ Local Setup & Installation (Required)

To ensure the website works correctly (and to fix "Blank Page" or "Content Security Policy" errors), you must install dependencies and build the project.

### 1. Prerequisites
- Download and install **Node.js** (v18 or higher) from [nodejs.org](https://nodejs.org).

### 2. Install Dependencies (Installs Tailwind CSS)
Open your terminal or command prompt in the project folder and run:
```bash
npm install
```
This command downloads React, Vite, and **Tailwind CSS** locally so they can be compiled.

### 3. Run Development Server
To preview the site on your computer while editing:
```bash
npm run dev
```

### 4. Build for Production
When you are ready to deploy, run:
```bash
npm run build
```
This command compiles your code and generates a **`dist/`** folder. **This folder contains your actual website.**

---

## 🚀 Deployment Guide

### Option 1: Deploying to Netlify (Recommended)

**Method A: Drag & Drop (Manual)**
1. Run `npm run build` on your computer.
2. Locate the **`dist`** folder created in your project directory.
3. Drag and drop the **`dist`** folder (not the whole project) into the Netlify deployment area.

**Method B: Git Integration (Automatic)**
1. Push your code to GitHub/GitLab.
2. Connect the repository to Netlify.
3. Use these settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

### Option 2: Deploying to Hostinger (Apache/cPanel)
1. Run `npm run build` on your computer.
2. Open the newly created **`dist`** folder.
3. Select **all files** inside `dist` (index.html, assets folder, etc.).
4. Upload these files to your Hostinger **`public_html`** folder via File Manager or FTP.
5. **Important**: Ensure you also upload the `.htaccess` file (located in your source `public/` folder) to `public_html` to prevent 404 errors when refreshing pages.

---

## 🔑 Admin Access
- **URL**: Click "Staff Access" in the site footer.
- **Default Password**: `admin123`

## 🎨 Customization
- **Logo/Colors**: Go to Admin Dashboard > Site Settings.
- **Hero Image**: Can be updated in Site Settings.
- **Products**: Manage inventory in the Admin Dashboard.

## 📦 Features
- **WhatsApp Checkout**: Orders are sent directly to WhatsApp.
- **Wishlist & Cart**: Local storage based.
- **SEO Optimized**: Dynamic meta tags and JSON-LD Schema for Google.
- **Responsive**: Mobile-first luxury design.