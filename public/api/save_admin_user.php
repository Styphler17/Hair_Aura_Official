<?php
// api/save_admin_user.php
require 'db_connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}

// Determine action
$action = isset($data['action']) ? $data['action'] : (isset($data['id']) && !empty($data['id']) ? 'update' : 'create');

if ($action === 'create') {
    // Validate required fields
    if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Name, email, and password are required']);
        exit;
    }

    // Generate ID
    $id = isset($data['id']) ? $data['id'] : time() . '_' . uniqid();
    
    // Check for duplicate email
    $checkEmail = $conn->prepare("SELECT id FROM admin_users WHERE email = ?");
    $checkEmail->bind_param("s", $data['email']);
    $checkEmail->execute();
    $emailResult = $checkEmail->get_result();
    $checkEmail->close();
    
    if ($emailResult->num_rows > 0) {
        http_response_code(409);
        echo json_encode(['error' => 'Email already exists']);
        exit;
    }
    
    // Check for duplicate ID
    $checkId = $conn->prepare("SELECT id FROM admin_users WHERE id = ?");
    $checkId->bind_param("s", $id);
    $checkId->execute();
    $idResult = $checkId->get_result();
    $checkId->close();
    
    if ($idResult->num_rows > 0) {
        http_response_code(409);
        echo json_encode(['error' => 'User ID already exists']);
        exit;
    }
    
    // Insert new user
    $sql = "INSERT INTO admin_users (id, name, email, password, role, avatar, last_login) VALUES (?, ?, ?, ?, ?, ?, NULL)";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare statement: ' . $conn->error]);
        $conn->close();
        exit;
    }
    
    $role = isset($data['role']) ? $data['role'] : 'Editor';
    $avatar = isset($data['avatar']) ? $data['avatar'] : '';
    
    $stmt->bind_param("ssssss",
        $id,
        $data['name'],
        $data['email'],
        $data['password'], // In production, this should be hashed
        $role,
        $avatar
    );
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'id' => $id,
            'message' => 'Admin user created successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create admin user: ' . $stmt->error]);
    }
    $stmt->close();
    
} else {
    // Update existing user
    if (!isset($data['id']) || empty($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'User ID is required for update']);
        exit;
    }
    
    // Check if user exists
    $checkUser = $conn->prepare("SELECT id FROM admin_users WHERE id = ?");
    $checkUser->bind_param("s", $data['id']);
    $checkUser->execute();
    $userResult = $checkUser->get_result();
    $checkUser->close();
    
    if ($userResult->num_rows === 0) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
        exit;
    }
    
    // Check for duplicate email (excluding current user)
    if (isset($data['email'])) {
        $checkEmail = $conn->prepare("SELECT id FROM admin_users WHERE email = ? AND id != ?");
        $checkEmail->bind_param("ss", $data['email'], $data['id']);
        $checkEmail->execute();
        $emailResult = $checkEmail->get_result();
        $checkEmail->close();
        
        if ($emailResult->num_rows > 0) {
            http_response_code(409);
            echo json_encode(['error' => 'Email already exists']);
            exit;
        }
    }
    
    // Build dynamic update query based on provided fields
    $updateFields = [];
    $types = "";
    $values = [];
    
    if (isset($data['name'])) {
        $updateFields[] = "name = ?";
        $types .= "s";
        $values[] = $data['name'];
    }
    
    if (isset($data['email'])) {
        $updateFields[] = "email = ?";
        $types .= "s";
        $values[] = $data['email'];
    }
    
    // Always update password if provided (even if empty string, to allow password changes)
    if (isset($data['password'])) {
        $updateFields[] = "password = ?";
        $types .= "s";
        $values[] = $data['password']; // In production, this should be hashed
    }
    
    if (isset($data['role'])) {
        $updateFields[] = "role = ?";
        $types .= "s";
        $values[] = $data['role'];
    }
    
    if (isset($data['avatar'])) {
        $updateFields[] = "avatar = ?";
        $types .= "s";
        $values[] = $data['avatar'];
    }
    
    if (isset($data['last_login'])) {
        $updateFields[] = "last_login = ?";
        $types .= "s";
        $values[] = $data['last_login'];
    }
    
    if (empty($updateFields)) {
        echo json_encode([
            'success' => true,
            'id' => $data['id'],
            'message' => 'No changes to update'
        ]);
        $conn->close();
        exit;
    }
    
    // Add ID to the end for WHERE clause
    $types .= "s";
    $values[] = $data['id'];
    
    $sql = "UPDATE admin_users SET " . implode(", ", $updateFields) . " WHERE id = ?";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare statement: ' . $conn->error]);
        $conn->close();
        exit;
    }
    
    $stmt->bind_param($types, ...$values);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'id' => $data['id'],
            'message' => 'Admin user updated successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update admin user: ' . $stmt->error]);
    }
    $stmt->close();
}

$conn->close();
?>
