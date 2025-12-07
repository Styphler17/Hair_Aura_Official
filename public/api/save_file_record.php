<?php
// api/save_file_record.php
// Optional: Save file metadata to database for tracking
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

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['url']) || !isset($data['filename'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: url, filename']);
    exit;
}

// Optional: Create uploaded_files table if it doesn't exist
// For now, we'll just return success since files are already saved
// The URL is stored in the respective tables (products, site_settings, etc.)

echo json_encode([
    'success' => true,
    'message' => 'File uploaded successfully',
    'url' => $data['url']
]);

$conn->close();
?>

