<?php
// api/login.php
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

if (!$data || !isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Email and password are required']);
    exit;
}

$email = $data['email'];
$password = $data['password'];

// Query user by email
$sql = "SELECT id, name, email, password, role, avatar, last_login FROM admin_users WHERE email = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $conn->error]);
    exit;
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid email or password']);
    $stmt->close();
    $conn->close();
    exit;
}

$user = $result->fetch_assoc();

// Verify password (plain text comparison for now - should use password_verify in production)
if ($password !== $user['password']) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid email or password']);
    $stmt->close();
    $conn->close();
    exit;
}

// Update last login
$updateSql = "UPDATE admin_users SET last_login = NOW() WHERE id = ?";
$updateStmt = $conn->prepare($updateSql);
$updateStmt->bind_param("s", $user['id']);
$updateStmt->execute();
$updateStmt->close();

// Remove password from response
unset($user['password']);

// Return user data
echo json_encode([
    'success' => true,
    'user' => [
        'id' => $user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'role' => $user['role'],
        'avatar' => $user['avatar'],
        'lastLogin' => $user['last_login']
    ]
]);

$stmt->close();
$conn->close();
?>
