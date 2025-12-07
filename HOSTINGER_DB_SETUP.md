
# Hostinger Database Setup & Connection Guide

Currently, your Hair Aura application uses **LocalStorage** (the browser's memory) to store products, admin users, and settings. This is great for demos, but for a live e-commerce business, you need a real **MySQL Database**.

Hostinger provides excellent MySQL hosting. Since your frontend is **React**, you cannot connect directly to the database (it's insecure). You need a small **PHP Bridge (API)** to talk between React and MySQL.

## Phase 1: Create the Database on Hostinger

1.  Log in to your **Hostinger hPanel**.
2.  Navigate to **Databases** > **Management**.
3.  In the "Create New MySQL Database" section, enter:
    *   **MySQL Database Name**: e.g., `u123456789_hairaura`
    *   **MySQL Username**: e.g., `u123456789_admin`
    *   **Password**: *Create a strong password and save it.*
4.  Click **Create**.

## Phase 2: Import Your Tables

1.  In the List of Current MySQL Databases (on the same page), find your new database.
2.  Click **Enter phpMyAdmin**.
3.  In phpMyAdmin, click the **Import** tab at the top.
4.  Open your project file **`DATABASE_SCHEMA.md`** (or `db_schema.sql` if you have it).
5.  Copy the SQL code blocks (create tables for products, users, etc.).
6.  Paste them into the **SQL** tab in phpMyAdmin OR save them as a `.sql` file and upload it in the Import tab.
7.  Click **Go**.
    *   *Result: You now have empty tables ready for data.*

## Phase 3: Create the Database Connection (The Backend)

You need to create a PHP file on your server that connects to this database.

1.  Go to **Hostinger File Manager** (in hPanel).
2.  Navigate to `public_html`.
3.  Create a folder named `api`.
4.  Inside `api`, create a file named `db_connect.php`.
5.  Paste the following code:

```php
<?php
// db_connect.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost"; // Hostinger usually uses 'localhost'
$username = "u123456789_admin"; // YOUR Hostinger DB Username
$password = "YourStrongPassword!"; // YOUR Hostinger DB Password
$dbname = "u123456789_hairaura"; // YOUR Hostinger DB Name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
?>
```

## Phase 4: Create an API Endpoint (Example: Get Products)

To let your React app fetch products, create `get_products.php` in the same `api` folder:

```php
<?php
// api/get_products.php
require 'db_connect.php';

$sql = "SELECT * FROM products";
$result = $conn->query($sql);

$products = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Handle JSON fields manually if needed
        $row['tags'] = json_decode($row['tags']); 
        $row['images'] = json_decode($row['images']); 
        $products[] = $row;
    }
}

echo json_encode($products);
$conn->close();
?>
```

## Phase 5: Connect React to Hostinger

Now, update your React code to fetch from this live URL instead of LocalStorage.

**Example Update in `services/productService.ts`:**

```typescript
// Old LocalStorage way:
// getAll: () => JSON.parse(localStorage.getItem('products'))

// New Live Hostinger way:
getAll: async () => {
    try {
        const response = await fetch('https://your-domain.com/api/get_products.php');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}
```

## Phase 6: Handling File Uploads

To allow admins to upload images directly to your Hostinger server, create `upload.php`.

1.  Navigate to `public_html/api/` in File Manager.
2.  Create a file named `upload.php`.
3.  Paste the code below.
4.  **Important**: Go back to `public_html` and create a folder named `uploads`.
5.  Right-click the `uploads` folder, select **Permissions**, and ensure it is set to **755** (or 777 if 755 doesn't work, but 755 is safer).

```php
<?php
// api/upload.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Check if file was uploaded
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'No file uploaded or upload error']);
    exit;
}

$file = $_FILES['file'];
$uploadDir = '../uploads/'; // Folder outside/relative to api
$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm'];

// Validate type
if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid file type']);
    exit;
}

// Generate safe filename
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid('aura_', true) . '.' . $extension;
$targetPath = $uploadDir . $filename;

// Move file
if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    // Return the public URL
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
    $host = $_SERVER['HTTP_HOST'];
    $publicUrl = "$protocol://$host/uploads/$filename";
    
    echo json_encode(['url' => $publicUrl]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save file']);
}
?>
```
