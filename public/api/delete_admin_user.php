<?php
// api/delete_admin_user.php
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
    echo json_encode(['error' => 'User ID is required']);
    exit;
}

// Check if this is the last admin user
$countSql = "SELECT COUNT(*) as count FROM admin_users";
$countResult = $conn->query($countSql);
$countRow = $countResult->fetch_assoc();

if ($countRow['count'] <= 1) {
    http_response_code(400);
    echo json_encode(['error' => 'Cannot delete the last admin user']);
    exit;
}

$sql = "DELETE FROM admin_users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $data['id']);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(['success' => true, 'message' => 'Admin user deleted successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
    }
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to delete admin user: ' . $conn->error]);
}

$stmt->close();
$conn->close();
?>
