<?php
// api/upload.php
// Handles file uploads to the server and optionally saves metadata to database
require 'db_connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

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

// Create uploads directory if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Move file
if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    // Return the public URL
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
    $host = $_SERVER['HTTP_HOST'];
    $publicUrl = "$protocol://$host/uploads/$filename";
    
    // Optional: Save file metadata to database (if uploaded_files table exists)
    try {
        // Check if uploaded_files table exists
        $checkTable = $conn->query("SHOW TABLES LIKE 'uploaded_files'");
        if ($checkTable && $checkTable->num_rows > 0) {
            $originalFilename = $file['name'];
            $fileType = $file['type'];
            $fileSize = $file['size'];
            $usedIn = isset($_POST['used_in']) ? $_POST['used_in'] : null;
            $referenceId = isset($_POST['reference_id']) ? $_POST['reference_id'] : null;
            
            $stmt = $conn->prepare("INSERT INTO uploaded_files (filename, original_filename, file_path, file_url, file_type, file_size, used_in, reference_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sssssiss", $filename, $originalFilename, $targetPath, $publicUrl, $fileType, $fileSize, $usedIn, $referenceId);
            $stmt->execute();
            $stmt->close();
        }
    } catch (Exception $e) {
        // Silently fail if table doesn't exist or insert fails
        // File is still uploaded successfully
        error_log("File metadata save failed: " . $e->getMessage());
    }
    
    echo json_encode([
        'url' => $publicUrl,
        'filename' => $filename,
        'path' => $targetPath
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save file']);
}

$conn->close();
?>

