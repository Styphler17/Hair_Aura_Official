<?php
// api/save_blog_post.php
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

// Validate required fields
if (empty($data['title'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Title is required']);
    exit;
}

// Helper function to convert date to MySQL format
function convertToMySQLDate($date) {
    if (empty($date)) {
        return date('Y-m-d H:i:s');
    }
    
    // If date contains 'T', it's ISO format
    if (strpos($date, 'T') !== false) {
        try {
            $dateTime = new DateTime($date);
            return $dateTime->format('Y-m-d H:i:s');
        } catch (Exception $e) {
            return date('Y-m-d H:i:s');
        }
    }
    
    return $date;
}

// Determine if this is create or update
$isUpdate = isset($data['action']) && $data['action'] === 'update';
if (!$isUpdate && isset($data['id']) && !empty($data['id'])) {
    // Check if ID already exists in database
    $checkSql = "SELECT id FROM blog_posts WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $data['id']);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    $checkStmt->close();
    
    if ($checkResult->num_rows > 0) {
        $isUpdate = true;
    }
}

if ($isUpdate) {
    // UPDATE existing blog post
    if (!isset($data['id']) || empty($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Blog post ID is required for update']);
        exit;
    }
    
    // First check if post exists
    $checkSql = "SELECT id FROM blog_posts WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $data['id']);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    $checkStmt->close();
    
    if ($checkResult->num_rows === 0) {
        http_response_code(404);
        echo json_encode(['error' => 'Blog post not found']);
        $conn->close();
        exit;
    }
    
    $date = convertToMySQLDate($data['date'] ?? null);
    
    $sql = "UPDATE blog_posts SET
        title = ?,
        excerpt = ?,
        content = ?,
        image = ?,
        author = ?,
        date = ?,
        seo_description = ?
    WHERE id = ?";
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare statement: ' . $conn->error]);
        $conn->close();
        exit;
    }
    
    $title = $data['title'] ?? '';
    $excerpt = $data['excerpt'] ?? '';
    $content = $data['content'] ?? '';
    $image = $data['image'] ?? '';
    $author = $data['author'] ?? 'Admin';
    $seo_description = $data['seo_description'] ?? '';
    
    $stmt->bind_param("ssssssss",
        $title,
        $excerpt,
        $content,
        $image,
        $author,
        $date,
        $seo_description,
        $data['id']
    );
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'id' => $data['id'], 'message' => 'Blog post updated successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update blog post: ' . $stmt->error]);
    }
    $stmt->close();
    
} else {
    // CREATE new blog post
    $id = isset($data['id']) && !empty($data['id']) ? $data['id'] : time() . '_' . uniqid();
    
    // Check for duplicate ID
    $checkSql = "SELECT id FROM blog_posts WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $id);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    $checkStmt->close();
    
    if ($checkResult->num_rows > 0) {
        http_response_code(409);
        echo json_encode(['error' => 'Blog post with this ID already exists']);
        $conn->close();
        exit;
    }
    
    $date = convertToMySQLDate($data['date'] ?? null);
    
    $sql = "INSERT INTO blog_posts (id, title, excerpt, content, image, author, date, seo_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare statement: ' . $conn->error]);
        $conn->close();
        exit;
    }
    
    $title = $data['title'] ?? '';
    $excerpt = $data['excerpt'] ?? '';
    $content = $data['content'] ?? '';
    $image = $data['image'] ?? '';
    $author = $data['author'] ?? 'Admin';
    $seo_description = $data['seo_description'] ?? '';
    
    $stmt->bind_param("ssssssss",
        $id,
        $title,
        $excerpt,
        $content,
        $image,
        $author,
        $date,
        $seo_description
    );
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'id' => $id, 'message' => 'Blog post created successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create blog post: ' . $stmt->error]);
    }
    $stmt->close();
}

$conn->close();
?>

