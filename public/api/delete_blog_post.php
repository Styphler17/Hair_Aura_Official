<?php
// api/delete_blog_post.php
require 'db_connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Blog post ID is required']);
    exit;
}

$sql = "DELETE FROM blog_posts WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $data['id']);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(['success' => true, 'message' => 'Blog post deleted successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Blog post not found']);
    }
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to delete blog post: ' . $conn->error]);
}

$stmt->close();
$conn->close();
?>

