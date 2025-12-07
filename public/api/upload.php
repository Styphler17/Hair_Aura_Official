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
    
    echo json_encode(['url' => $publicUrl]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save file']);
}
?>

